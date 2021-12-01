import { useApolloClient } from '@apollo/client';
import { useMemo } from 'react';
import { TradeFormProps } from '../../../containers/TradeForm/TradeForm';
import { Pool } from '../../../generated/graphql';
import { readLastBlock } from '../../../hooks/lastBlock/readLastBlock';
import { useMathContext } from '../../../hooks/math/useMath';
import { SpotPrice } from '../TradePage';
import { calculateSpotPriceFromPool as calculateSpotPriceFromPoolLBP } from '../../../hooks/pools/lbp/calculateSpotPrice';
import { calculateSpotPriceFromPool as calculateSpotPriceFromPoolXYK } from '../../../hooks/pools/xyk/calculateSpotPrice';
import log from 'loglevel';

export const useSpotPrice = (
    { assetAId, assetBId }: TradeFormProps['assetIds'],
    pool?: Pool,
): SpotPrice | undefined => {
    const client = useApolloClient();
    const relaychainBlockNumber = readLastBlock(client);
    const { math } = useMathContext();
   
    return useMemo(() => {
        if (!math || !pool || !assetAId || !assetBId || !relaychainBlockNumber) return;

        // if the pool is an XYKPool, use the XYKPool spot price calculation and vice versa
        const calculateSpotPriceFromPool = pool?.__typename === 'XYKPool'
            ? calculateSpotPriceFromPoolXYK
            : calculateSpotPriceFromPoolLBP

        const spotPrice: SpotPrice = {
            // TODO: get rid of `as any` since its not type safe *at all*
            aToB: calculateSpotPriceFromPool(math, pool as any, assetAId, assetBId),
            bToA: calculateSpotPriceFromPool(math, pool as any, assetBId, assetAId)
        }

        log.debug('TradePage.useSpotPrice', spotPrice);

        return spotPrice;
    }, [relaychainBlockNumber, assetAId, assetBId, pool]);
}