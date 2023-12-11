import {Asset, Contract, Name, SafeMath, TableStore, check, currentTimeMs, requireAuth} from "proton-tsc";
import { ATOMICASSETS_CONTRACT, Assets, AtomicAttribute, Templates, sendMintAsset } from "proton-tsc/atomicassets";

import { ClaimablesTable, ClaimsTable, LogsTable } from "./tables";


@contract
export class TwelveDaysContract extends Contract {

  private logTable: TableStore<LogsTable> = new TableStore<LogsTable>(this.receiver); 
  private claimablesTable: TableStore<ClaimablesTable> = new TableStore<ClaimablesTable>(this.receiver); 
  
  @action('template.reg')
  registerTemplate(templateId: u32,collectionName:Name, activeStartTime: u32, activeEndTime: u32, immutable: AtomicAttribute[], mutable: AtomicAttribute[]): void {
    
    requireAuth(this.receiver);
    const aaTemplatesTable: TableStore<Templates> = new TableStore<Templates>(ATOMICASSETS_CONTRACT,collectionName); 
    aaTemplatesTable.requireGet(templateId,`🎅 Santa says: Oh Oh Oh Template ${templateId} not exists on ${collectionName} `);
    
    const duplicatedTemplate = this.claimablesTable.exists(u64(templateId));
    check(!duplicatedTemplate, `🎅 Santa says: Oh Oh Oh Duplicated template`);

    const newClaimable = new ClaimablesTable(
      u64(templateId),
      collectionName,
      activeStartTime,
      activeEndTime,
      immutable,
      mutable
    );
    this.claimablesTable.store(newClaimable, this.receiver);
  }
  
  @action('claim.mint')
  claimMint(account: Name): void {

    let currentClaimable = this.claimablesTable.first();
    check(!!currentClaimable, '🎅 Santa says: Oh Oh Oh Sorry there is no asset to claim right now!');
    
    if (!currentClaimable) return;
    
    if (this.hasCurrentClaimRightNow(currentClaimable)) { 

      check(!this.accountHasClaim(account,currentClaimable), `🎅 Santa says: Oh Oh Oh, you've already claimed this! I may had you to the naughty list`);
      this.applyMint(account, currentClaimable);
      const newLog = new LogsTable(this.logTable.availablePrimaryKey, `Will mint template ${currentClaimable.templateId}`)
      this.logTable.store(newLog,this.receiver)
      return;

    }

    while (currentClaimable) {
      
      if (this.hasCurrentClaimRightNow(currentClaimable)) {
        const log = new LogsTable(this.logTable.availablePrimaryKey, `currentClaimable ${currentClaimable.templateId}`)
        this.logTable.store(log, this.receiver);
          this.applyMint(account, currentClaimable);
          const newLog = new LogsTable(this.logTable.availablePrimaryKey, `Will mint template ${currentClaimable.templateId}`)
          this.logTable.store(newLog,this.receiver)
          break;
        }
      currentClaimable = this.claimablesTable.next(currentClaimable);
    }

    
    //check(false,'🎅 Santa says: Oh Oh Oh: i have no present for you now, you may have been naughty 😉')

  }
  
  @action('logmint', notify)
  onLogMint(assetId: u64, minter: Name, collection: Name, schema: Name, templateId: i32, newOwner: Name, immutableData: AtomicAttribute[], mutableData: AtomicAttribute[], backedTokens: Asset[], immutableTemplateData: AtomicAttribute[]): void {
    
    const now = currentTimeMs()
    const claimsTable: TableStore<ClaimsTable> = new TableStore<ClaimsTable>(this.receiver, newOwner);
    const newClaim: ClaimsTable = new ClaimsTable(u64(templateId), assetId, now);
    claimsTable.store(newClaim, this.receiver);
    
  }

  @action('dev.clrtmpl')
  clearTemplates(): void {

    this.removeAllClaimables();
  }

  @action('dev.clrclaim')
  clearClaims(account:Name): void {

    const claimsTable: TableStore<ClaimsTable> = new TableStore<ClaimsTable>(this.receiver, account);
    while (!claimsTable.isEmpty()) {
      const claimToRemove = claimsTable.first();      
      if (claimToRemove) {
        claimsTable.remove(claimToRemove);
      }
    }
  }
  
  @action('dev.clrmint')
  clearMint(): void {
    
    while (!this.claimablesTable.isEmpty()) {
      const claimableToRemove = this.claimablesTable.first();      
      if (claimableToRemove) {
        this.claimablesTable.remove(claimableToRemove);
      }
    }

  }
  
  @action('dev.clrlog')
  clearLogs(): void {
    
    while (!this.logTable.isEmpty()) {
      const logToRemove = this.logTable.first();      
      if (logToRemove) {
        this.logTable.remove(logToRemove);
      }
    }

  }
  
  @action('dev.gentmpl')
  generateTemplate(): void {

    this.removeAllClaimables();
    const h24:u32 = 3600000;
    const now: u64 = currentTimeMs();

    const ids = [1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1806];
    const totalLength = ids.length;
    
    while (ids.length>0) {
      const index = totalLength - ids.length;
      const id = ids.shift();
      const generatedClaimable = new ClaimablesTable(
        id,
        this.receiver,
        now+u64(h24*index) ,
        now+u64(h24*index)+u64(h24-1) ,
        [],
        []
      )
      const log = new LogsTable(this.logTable.availablePrimaryKey, `index: ${index} Now: ${now} ${u64(h24*index)} ${SafeMath.add(now,u64(h24*index))}`)
      this.logTable.store(log, this.receiver);
      this.claimablesTable.store(generatedClaimable, this.receiver);
      
    }

  }

  private hasCurrentClaimRightNow(claimable: ClaimablesTable): boolean {
    
    const now = currentTimeMs();
    const log = new LogsTable(this.logTable.availablePrimaryKey, ` Now: ${now} mintable ${now >= claimable.activeStartTime} ${now <= claimable.activeEndTime}`)
      this.logTable.store(log, this.receiver);
    return now >= claimable.activeStartTime && now <= claimable.activeEndTime;
    

  } 
  
  private accountHasClaim(account:Name,claimable: ClaimablesTable): boolean {
    
    const claimsTable: TableStore<ClaimsTable> = new TableStore<ClaimsTable>(this.receiver, account);
    const existingClaim = claimsTable.get(claimable.templateId);
    return !!existingClaim;
    

  } 

  private applyMint(account:Name,claimable: ClaimablesTable): void {
    
    const aaTemplatesTable: TableStore<Templates> = new TableStore<Templates>(ATOMICASSETS_CONTRACT,claimable.collectionName); 
    const aaTemplate = aaTemplatesTable.requireGet(claimable.templateId, '🎅 Santa says: Oh Oh Oh Template not exists');
    sendMintAsset(
      this.receiver,
      this.receiver,
      claimable.collectionName,
      aaTemplate.schema_name,
      u32(aaTemplate.template_id),
      account,
      claimable.immutable,
      claimable.mutable,
      []
    )
  }

  private removeAllClaimables():void {
    

      while (!this.claimablesTable.isEmpty()) {
        const claimableToRemove = this.claimablesTable.first();      
        if (claimableToRemove) {
          this.claimablesTable.remove(claimableToRemove);
        }
      }
    
  }

}

