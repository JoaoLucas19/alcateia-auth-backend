import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model BannedHwid
 * HWIDs bloqueados globalmente (login/cadastro do cheat)
 */
export type BannedHwidModel = runtime.Types.Result.DefaultSelection<Prisma.$BannedHwidPayload>;
export type AggregateBannedHwid = {
    _count: BannedHwidCountAggregateOutputType | null;
    _min: BannedHwidMinAggregateOutputType | null;
    _max: BannedHwidMaxAggregateOutputType | null;
};
export type BannedHwidMinAggregateOutputType = {
    id: string | null;
    hwid: string | null;
    reason: string | null;
    createdAt: Date | null;
};
export type BannedHwidMaxAggregateOutputType = {
    id: string | null;
    hwid: string | null;
    reason: string | null;
    createdAt: Date | null;
};
export type BannedHwidCountAggregateOutputType = {
    id: number;
    hwid: number;
    reason: number;
    createdAt: number;
    _all: number;
};
export type BannedHwidMinAggregateInputType = {
    id?: true;
    hwid?: true;
    reason?: true;
    createdAt?: true;
};
export type BannedHwidMaxAggregateInputType = {
    id?: true;
    hwid?: true;
    reason?: true;
    createdAt?: true;
};
export type BannedHwidCountAggregateInputType = {
    id?: true;
    hwid?: true;
    reason?: true;
    createdAt?: true;
    _all?: true;
};
export type BannedHwidAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which BannedHwid to aggregate.
     */
    where?: Prisma.BannedHwidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BannedHwids to fetch.
     */
    orderBy?: Prisma.BannedHwidOrderByWithRelationInput | Prisma.BannedHwidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.BannedHwidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BannedHwids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BannedHwids.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned BannedHwids
    **/
    _count?: true | BannedHwidCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: BannedHwidMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: BannedHwidMaxAggregateInputType;
};
export type GetBannedHwidAggregateType<T extends BannedHwidAggregateArgs> = {
    [P in keyof T & keyof AggregateBannedHwid]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBannedHwid[P]> : Prisma.GetScalarType<T[P], AggregateBannedHwid[P]>;
};
export type BannedHwidGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BannedHwidWhereInput;
    orderBy?: Prisma.BannedHwidOrderByWithAggregationInput | Prisma.BannedHwidOrderByWithAggregationInput[];
    by: Prisma.BannedHwidScalarFieldEnum[] | Prisma.BannedHwidScalarFieldEnum;
    having?: Prisma.BannedHwidScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BannedHwidCountAggregateInputType | true;
    _min?: BannedHwidMinAggregateInputType;
    _max?: BannedHwidMaxAggregateInputType;
};
export type BannedHwidGroupByOutputType = {
    id: string;
    hwid: string;
    reason: string | null;
    createdAt: Date;
    _count: BannedHwidCountAggregateOutputType | null;
    _min: BannedHwidMinAggregateOutputType | null;
    _max: BannedHwidMaxAggregateOutputType | null;
};
export type GetBannedHwidGroupByPayload<T extends BannedHwidGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BannedHwidGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BannedHwidGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BannedHwidGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BannedHwidGroupByOutputType[P]>;
}>>;
export type BannedHwidWhereInput = {
    AND?: Prisma.BannedHwidWhereInput | Prisma.BannedHwidWhereInput[];
    OR?: Prisma.BannedHwidWhereInput[];
    NOT?: Prisma.BannedHwidWhereInput | Prisma.BannedHwidWhereInput[];
    id?: Prisma.StringFilter<"BannedHwid"> | string;
    hwid?: Prisma.StringFilter<"BannedHwid"> | string;
    reason?: Prisma.StringNullableFilter<"BannedHwid"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"BannedHwid"> | Date | string;
};
export type BannedHwidOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    hwid?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _relevance?: Prisma.BannedHwidOrderByRelevanceInput;
};
export type BannedHwidWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    hwid?: string;
    AND?: Prisma.BannedHwidWhereInput | Prisma.BannedHwidWhereInput[];
    OR?: Prisma.BannedHwidWhereInput[];
    NOT?: Prisma.BannedHwidWhereInput | Prisma.BannedHwidWhereInput[];
    reason?: Prisma.StringNullableFilter<"BannedHwid"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"BannedHwid"> | Date | string;
}, "id" | "hwid">;
export type BannedHwidOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    hwid?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.BannedHwidCountOrderByAggregateInput;
    _max?: Prisma.BannedHwidMaxOrderByAggregateInput;
    _min?: Prisma.BannedHwidMinOrderByAggregateInput;
};
export type BannedHwidScalarWhereWithAggregatesInput = {
    AND?: Prisma.BannedHwidScalarWhereWithAggregatesInput | Prisma.BannedHwidScalarWhereWithAggregatesInput[];
    OR?: Prisma.BannedHwidScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BannedHwidScalarWhereWithAggregatesInput | Prisma.BannedHwidScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"BannedHwid"> | string;
    hwid?: Prisma.StringWithAggregatesFilter<"BannedHwid"> | string;
    reason?: Prisma.StringNullableWithAggregatesFilter<"BannedHwid"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BannedHwid"> | Date | string;
};
export type BannedHwidCreateInput = {
    id?: string;
    hwid: string;
    reason?: string | null;
    createdAt?: Date | string;
};
export type BannedHwidUncheckedCreateInput = {
    id?: string;
    hwid: string;
    reason?: string | null;
    createdAt?: Date | string;
};
export type BannedHwidUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BannedHwidUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BannedHwidCreateManyInput = {
    id?: string;
    hwid: string;
    reason?: string | null;
    createdAt?: Date | string;
};
export type BannedHwidUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BannedHwidUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BannedHwidOrderByRelevanceInput = {
    fields: Prisma.BannedHwidOrderByRelevanceFieldEnum | Prisma.BannedHwidOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type BannedHwidCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hwid?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BannedHwidMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hwid?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BannedHwidMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hwid?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BannedHwidSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hwid?: boolean;
    reason?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["bannedHwid"]>;
export type BannedHwidSelectScalar = {
    id?: boolean;
    hwid?: boolean;
    reason?: boolean;
    createdAt?: boolean;
};
export type BannedHwidOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hwid" | "reason" | "createdAt", ExtArgs["result"]["bannedHwid"]>;
export type $BannedHwidPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BannedHwid";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        hwid: string;
        reason: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["bannedHwid"]>;
    composites: {};
};
export type BannedHwidGetPayload<S extends boolean | null | undefined | BannedHwidDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BannedHwidPayload, S>;
export type BannedHwidCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BannedHwidFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BannedHwidCountAggregateInputType | true;
};
export interface BannedHwidDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BannedHwid'];
        meta: {
            name: 'BannedHwid';
        };
    };
    /**
     * Find zero or one BannedHwid that matches the filter.
     * @param {BannedHwidFindUniqueArgs} args - Arguments to find a BannedHwid
     * @example
     * // Get one BannedHwid
     * const bannedHwid = await prisma.bannedHwid.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BannedHwidFindUniqueArgs>(args: Prisma.SelectSubset<T, BannedHwidFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BannedHwidClient<runtime.Types.Result.GetResult<Prisma.$BannedHwidPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one BannedHwid that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BannedHwidFindUniqueOrThrowArgs} args - Arguments to find a BannedHwid
     * @example
     * // Get one BannedHwid
     * const bannedHwid = await prisma.bannedHwid.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BannedHwidFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BannedHwidFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BannedHwidClient<runtime.Types.Result.GetResult<Prisma.$BannedHwidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first BannedHwid that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedHwidFindFirstArgs} args - Arguments to find a BannedHwid
     * @example
     * // Get one BannedHwid
     * const bannedHwid = await prisma.bannedHwid.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BannedHwidFindFirstArgs>(args?: Prisma.SelectSubset<T, BannedHwidFindFirstArgs<ExtArgs>>): Prisma.Prisma__BannedHwidClient<runtime.Types.Result.GetResult<Prisma.$BannedHwidPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first BannedHwid that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedHwidFindFirstOrThrowArgs} args - Arguments to find a BannedHwid
     * @example
     * // Get one BannedHwid
     * const bannedHwid = await prisma.bannedHwid.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BannedHwidFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BannedHwidFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BannedHwidClient<runtime.Types.Result.GetResult<Prisma.$BannedHwidPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more BannedHwids that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedHwidFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BannedHwids
     * const bannedHwids = await prisma.bannedHwid.findMany()
     *
     * // Get first 10 BannedHwids
     * const bannedHwids = await prisma.bannedHwid.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const bannedHwidWithIdOnly = await prisma.bannedHwid.findMany({ select: { id: true } })
     *
     */
    findMany<T extends BannedHwidFindManyArgs>(args?: Prisma.SelectSubset<T, BannedHwidFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BannedHwidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a BannedHwid.
     * @param {BannedHwidCreateArgs} args - Arguments to create a BannedHwid.
     * @example
     * // Create one BannedHwid
     * const BannedHwid = await prisma.bannedHwid.create({
     *   data: {
     *     // ... data to create a BannedHwid
     *   }
     * })
     *
     */
    create<T extends BannedHwidCreateArgs>(args: Prisma.SelectSubset<T, BannedHwidCreateArgs<ExtArgs>>): Prisma.Prisma__BannedHwidClient<runtime.Types.Result.GetResult<Prisma.$BannedHwidPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many BannedHwids.
     * @param {BannedHwidCreateManyArgs} args - Arguments to create many BannedHwids.
     * @example
     * // Create many BannedHwids
     * const bannedHwid = await prisma.bannedHwid.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends BannedHwidCreateManyArgs>(args?: Prisma.SelectSubset<T, BannedHwidCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a BannedHwid.
     * @param {BannedHwidDeleteArgs} args - Arguments to delete one BannedHwid.
     * @example
     * // Delete one BannedHwid
     * const BannedHwid = await prisma.bannedHwid.delete({
     *   where: {
     *     // ... filter to delete one BannedHwid
     *   }
     * })
     *
     */
    delete<T extends BannedHwidDeleteArgs>(args: Prisma.SelectSubset<T, BannedHwidDeleteArgs<ExtArgs>>): Prisma.Prisma__BannedHwidClient<runtime.Types.Result.GetResult<Prisma.$BannedHwidPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one BannedHwid.
     * @param {BannedHwidUpdateArgs} args - Arguments to update one BannedHwid.
     * @example
     * // Update one BannedHwid
     * const bannedHwid = await prisma.bannedHwid.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends BannedHwidUpdateArgs>(args: Prisma.SelectSubset<T, BannedHwidUpdateArgs<ExtArgs>>): Prisma.Prisma__BannedHwidClient<runtime.Types.Result.GetResult<Prisma.$BannedHwidPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more BannedHwids.
     * @param {BannedHwidDeleteManyArgs} args - Arguments to filter BannedHwids to delete.
     * @example
     * // Delete a few BannedHwids
     * const { count } = await prisma.bannedHwid.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends BannedHwidDeleteManyArgs>(args?: Prisma.SelectSubset<T, BannedHwidDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more BannedHwids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedHwidUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BannedHwids
     * const bannedHwid = await prisma.bannedHwid.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends BannedHwidUpdateManyArgs>(args: Prisma.SelectSubset<T, BannedHwidUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one BannedHwid.
     * @param {BannedHwidUpsertArgs} args - Arguments to update or create a BannedHwid.
     * @example
     * // Update or create a BannedHwid
     * const bannedHwid = await prisma.bannedHwid.upsert({
     *   create: {
     *     // ... data to create a BannedHwid
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BannedHwid we want to update
     *   }
     * })
     */
    upsert<T extends BannedHwidUpsertArgs>(args: Prisma.SelectSubset<T, BannedHwidUpsertArgs<ExtArgs>>): Prisma.Prisma__BannedHwidClient<runtime.Types.Result.GetResult<Prisma.$BannedHwidPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of BannedHwids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedHwidCountArgs} args - Arguments to filter BannedHwids to count.
     * @example
     * // Count the number of BannedHwids
     * const count = await prisma.bannedHwid.count({
     *   where: {
     *     // ... the filter for the BannedHwids we want to count
     *   }
     * })
    **/
    count<T extends BannedHwidCountArgs>(args?: Prisma.Subset<T, BannedHwidCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BannedHwidCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a BannedHwid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedHwidAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BannedHwidAggregateArgs>(args: Prisma.Subset<T, BannedHwidAggregateArgs>): Prisma.PrismaPromise<GetBannedHwidAggregateType<T>>;
    /**
     * Group by BannedHwid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BannedHwidGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends BannedHwidGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BannedHwidGroupByArgs['orderBy'];
    } : {
        orderBy?: BannedHwidGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BannedHwidGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBannedHwidGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the BannedHwid model
     */
    readonly fields: BannedHwidFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for BannedHwid.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__BannedHwidClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the BannedHwid model
 */
export interface BannedHwidFieldRefs {
    readonly id: Prisma.FieldRef<"BannedHwid", 'String'>;
    readonly hwid: Prisma.FieldRef<"BannedHwid", 'String'>;
    readonly reason: Prisma.FieldRef<"BannedHwid", 'String'>;
    readonly createdAt: Prisma.FieldRef<"BannedHwid", 'DateTime'>;
}
/**
 * BannedHwid findUnique
 */
export type BannedHwidFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedHwid
     */
    select?: Prisma.BannedHwidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BannedHwid
     */
    omit?: Prisma.BannedHwidOmit<ExtArgs> | null;
    /**
     * Filter, which BannedHwid to fetch.
     */
    where: Prisma.BannedHwidWhereUniqueInput;
};
/**
 * BannedHwid findUniqueOrThrow
 */
export type BannedHwidFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedHwid
     */
    select?: Prisma.BannedHwidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BannedHwid
     */
    omit?: Prisma.BannedHwidOmit<ExtArgs> | null;
    /**
     * Filter, which BannedHwid to fetch.
     */
    where: Prisma.BannedHwidWhereUniqueInput;
};
/**
 * BannedHwid findFirst
 */
export type BannedHwidFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedHwid
     */
    select?: Prisma.BannedHwidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BannedHwid
     */
    omit?: Prisma.BannedHwidOmit<ExtArgs> | null;
    /**
     * Filter, which BannedHwid to fetch.
     */
    where?: Prisma.BannedHwidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BannedHwids to fetch.
     */
    orderBy?: Prisma.BannedHwidOrderByWithRelationInput | Prisma.BannedHwidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for BannedHwids.
     */
    cursor?: Prisma.BannedHwidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BannedHwids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BannedHwids.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of BannedHwids.
     */
    distinct?: Prisma.BannedHwidScalarFieldEnum | Prisma.BannedHwidScalarFieldEnum[];
};
/**
 * BannedHwid findFirstOrThrow
 */
export type BannedHwidFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedHwid
     */
    select?: Prisma.BannedHwidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BannedHwid
     */
    omit?: Prisma.BannedHwidOmit<ExtArgs> | null;
    /**
     * Filter, which BannedHwid to fetch.
     */
    where?: Prisma.BannedHwidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BannedHwids to fetch.
     */
    orderBy?: Prisma.BannedHwidOrderByWithRelationInput | Prisma.BannedHwidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for BannedHwids.
     */
    cursor?: Prisma.BannedHwidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BannedHwids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BannedHwids.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of BannedHwids.
     */
    distinct?: Prisma.BannedHwidScalarFieldEnum | Prisma.BannedHwidScalarFieldEnum[];
};
/**
 * BannedHwid findMany
 */
export type BannedHwidFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedHwid
     */
    select?: Prisma.BannedHwidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BannedHwid
     */
    omit?: Prisma.BannedHwidOmit<ExtArgs> | null;
    /**
     * Filter, which BannedHwids to fetch.
     */
    where?: Prisma.BannedHwidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BannedHwids to fetch.
     */
    orderBy?: Prisma.BannedHwidOrderByWithRelationInput | Prisma.BannedHwidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing BannedHwids.
     */
    cursor?: Prisma.BannedHwidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BannedHwids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BannedHwids.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of BannedHwids.
     */
    distinct?: Prisma.BannedHwidScalarFieldEnum | Prisma.BannedHwidScalarFieldEnum[];
};
/**
 * BannedHwid create
 */
export type BannedHwidCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedHwid
     */
    select?: Prisma.BannedHwidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BannedHwid
     */
    omit?: Prisma.BannedHwidOmit<ExtArgs> | null;
    /**
     * The data needed to create a BannedHwid.
     */
    data: Prisma.XOR<Prisma.BannedHwidCreateInput, Prisma.BannedHwidUncheckedCreateInput>;
};
/**
 * BannedHwid createMany
 */
export type BannedHwidCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many BannedHwids.
     */
    data: Prisma.BannedHwidCreateManyInput | Prisma.BannedHwidCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * BannedHwid update
 */
export type BannedHwidUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedHwid
     */
    select?: Prisma.BannedHwidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BannedHwid
     */
    omit?: Prisma.BannedHwidOmit<ExtArgs> | null;
    /**
     * The data needed to update a BannedHwid.
     */
    data: Prisma.XOR<Prisma.BannedHwidUpdateInput, Prisma.BannedHwidUncheckedUpdateInput>;
    /**
     * Choose, which BannedHwid to update.
     */
    where: Prisma.BannedHwidWhereUniqueInput;
};
/**
 * BannedHwid updateMany
 */
export type BannedHwidUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update BannedHwids.
     */
    data: Prisma.XOR<Prisma.BannedHwidUpdateManyMutationInput, Prisma.BannedHwidUncheckedUpdateManyInput>;
    /**
     * Filter which BannedHwids to update
     */
    where?: Prisma.BannedHwidWhereInput;
    /**
     * Limit how many BannedHwids to update.
     */
    limit?: number;
};
/**
 * BannedHwid upsert
 */
export type BannedHwidUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedHwid
     */
    select?: Prisma.BannedHwidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BannedHwid
     */
    omit?: Prisma.BannedHwidOmit<ExtArgs> | null;
    /**
     * The filter to search for the BannedHwid to update in case it exists.
     */
    where: Prisma.BannedHwidWhereUniqueInput;
    /**
     * In case the BannedHwid found by the `where` argument doesn't exist, create a new BannedHwid with this data.
     */
    create: Prisma.XOR<Prisma.BannedHwidCreateInput, Prisma.BannedHwidUncheckedCreateInput>;
    /**
     * In case the BannedHwid was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.BannedHwidUpdateInput, Prisma.BannedHwidUncheckedUpdateInput>;
};
/**
 * BannedHwid delete
 */
export type BannedHwidDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedHwid
     */
    select?: Prisma.BannedHwidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BannedHwid
     */
    omit?: Prisma.BannedHwidOmit<ExtArgs> | null;
    /**
     * Filter which BannedHwid to delete.
     */
    where: Prisma.BannedHwidWhereUniqueInput;
};
/**
 * BannedHwid deleteMany
 */
export type BannedHwidDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which BannedHwids to delete
     */
    where?: Prisma.BannedHwidWhereInput;
    /**
     * Limit how many BannedHwids to delete.
     */
    limit?: number;
};
/**
 * BannedHwid without action
 */
export type BannedHwidDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BannedHwid
     */
    select?: Prisma.BannedHwidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BannedHwid
     */
    omit?: Prisma.BannedHwidOmit<ExtArgs> | null;
};
