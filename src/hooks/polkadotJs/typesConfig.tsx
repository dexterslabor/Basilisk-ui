export default {
    "alias": {
      "tokens": {
        "AccountData": "OrmlAccountData"
      }
    },
    "types": [
      {
        "AssetPair": {
          "asset_in": "AssetId",
          "asset_out": "AssetId"
        },
        "Amount": "i128",
        "AmountOf": "Amount",
        "Address": "AccountId",
        "OrmlAccountData": {
          "free": "Balance",
          "frozen": "Balance",
          "reserved": "Balance"
        },
        "Fee": {
          "numerator": "u32",
          "denominator": "u32"
        },
        "BalanceInfo": {
          "amount": "Balance",
          "assetId": "AssetId"
        },
        "Chain": {
          "genesisHash": "Vec<u8>",
          "lastBlockHash": "Vec<u8>"
        },
        "Currency": "AssetId",
        "CurrencyId": "AssetId",
        "CurrencyIdOf": "AssetId",
        "Intention": {
          "who": "AccountId",
          "asset_sell": "AssetId",
          "asset_buy": "AssetId",
          "amount": "Balance",
          "discount": "bool",
          "sell_or_buy": "IntentionType"
        },
        "IntentionId": "Hash",
        "IntentionType": {
          "_enum": [
            "SELL",
            "BUY"
          ]
        },
        "LookupSource": "AccountId",
        "Price": "Balance",
        "ClassId": "u64",
        "TokenId": "u64",
        "ClassData": {
          "is_pool": "bool"
        },
        "TokenData": {
          "locked": "bool"
        },
        "ClassInfo": {
          "metadata": "Vec<u8>",
          "total_issuance": "TokenId",
          "owner": "AccountId",
          "data": "ClassData"
        },
        "TokenInfo": {
          "metadata": "Vec<u8>",
          "owner": "AccountId",
          "data": "TokenData"
        },
        "ClassInfoOf": "ClassInfo",
        "TokenInfoOf": "TokenInfo",
        "ClassIdOf": "ClassId",
        "TokenIdOf": "TokenId",
        "OrderedSet": "Vec<AssetId>",
        "VestingSchedule": {
          "start": "BlockNumber",
          "period": "BlockNumber",
          "period_count": "u32",
          "per_period": "Compact<Balance>"
        },
        "VestingScheduleOf": "VestingSchedule",
        "LBPWeight": "u32",
        "WeightCurveType": {
          "_enum": [
            "Linear"
          ]
        },
        "PoolId": "AccountId",
        "BalanceOf": "Balance",
        "AssetType": {
          "_enum": {
            "Token": "Null",
            "PoolShare": "(AssetId,AssetId)"
          }
        },
        "Pool": {
          "owner": "AccountId",
          "start": "BlockNumber",
          "end": "BlockNumber",
          "assets": "AssetPair",
          "initial_weight": "LBPWeight",
          "final_weight": "LBPWeight",
          "weight_curve": "WeightCurveType",
          "fee": "Fee",
          "fee_collector": "AccountId"
        },
        "AssetDetails": {
          "name": "Vec<u8>",
          "asset_type": "AssetType",
          "existential_deposit": "Balance",
          "locked": "bool"
        },
        "AssetDetailsT": "AssetDetails",
        "AssetMetadata": {
          "symbol": "Vec<u8>",
          "decimals": "u8"
        },
        "AssetInstance": "AssetInstanceV1",
        "MultiLocation": "MultiLocationV1",
        "AssetNativeLocation": "MultiLocation",
        "MultiAsset": "MultiAssetV1",
        "Xcm": "XcmV1",
        "XcmOrder": "XcmOrderV1"
      }
    ]
  };