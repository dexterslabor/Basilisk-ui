import { useQuery } from '@apollo/client';
import { Query } from '../../../generated/graphql';
import { loader } from 'graphql.macro';

export const GET_POOLS = loader('./../graphql/GetPools.query.graphql');

export interface GetPoolsQueryResponse {
    pools: Query['pools']
}

export const useGetPoolsQuery = () => useQuery<GetPoolsQueryResponse>(GET_POOLS, {
    notifyOnNetworkStatusChange: true,
});