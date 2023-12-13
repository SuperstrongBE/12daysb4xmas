prepare:
	echo $(date)
	npm run build
	rm -rf ./deploy && mkdir deploy
	cd ./deploy && mkdir swap.bqst
	cd ./../../
	cd ./target && cp ./twelvedays.contract.wasm ./../deploy/twelvedays.contract.wasm && cp ./twelvedays.contract.abi ./../deploy/twelvedays.contract.abi
deploy-testnet:

	cd ./deploy/ && proton chain:set proton-test && proton contract:set 12daysb4xmas ./ 

deploy-mainnet:
	cd ./deploy/ && proton chain:set proton && proton contract:set 12daysb4xmas ./ 

feed-ram:
	proton chain:set proton && proton faucet:claim XPR 12daysb4xmas || echo "already claimed" && proton ram:buy 12daysb4xmas 12daysb4xmas 450000

testnet:
	make prepare && make deploy-testnet

publish:
	make prepare && make deploy-mainnet