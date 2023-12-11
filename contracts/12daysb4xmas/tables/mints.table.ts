import { EMPTY_NAME, Name, Table } from "proton-tsc";
import { AtomicAttribute } from "proton-tsc/atomicassets";

@table('mints')
export class MintTable extends Table {

  constructor(
    public key: u64 = 0,
    public account: Name = EMPTY_NAME,
    public templateId: u32 = 0,
    public mintedAssetId: u64 = 0,
    
  ) {
    super()
  }

  @primary 
  /**
   * Get the value of the symbol as a u64.
   * @returns {u64} - The value of the symbol.
   */
  get by_key(): u64 {
    
    return this.key;

  }
  /**
   * Set the value of the symbol from a u64.
   * @param {u64} value - The value to set for the symbol.
   */
  set by_key(value:u64) {
    
    this.key = value;

  }

}