import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model WhitelistedUid
 * Config singleton (painel Alcateia) — sobrescreve variáveis de ambiente quando preenchido
 * UIDs liberados para UID Bypass Free Fire (painel TOXIC)
 */
export type WhitelistedUidModel = runtime.Types.Result.DefaultSelection<Prisma.$WhitelistedUidPayload>;
export type AggregateWhitelistedUid = {
    _count: WhitelistedUidCountAggregateOutputType | null;
    _avg: WhitelistedUidAvgAggregateOutputType | null;
    _sum: WhitelistedUidSumAggregateOutputType | null;
    _min: WhitelistedUidMinAggregateOutputType | null;
    _max: WhitelistedUidMaxAggregateOutputType | null;
};
export type WhitelistedUidAvgAggregateOutputType = {
    validityDays: number | null;
};
export type WhitelistedUidSumAggregateOutputType = {
    validityDays: number | null;
};
export type WhitelistedUidMinAggregateOutputType = {
    id: string | null;
    uid: string | null;
    validityDays: number | null;
    expiresAt: Date | null;
    isActive: boolean | null;
    note: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WhitelistedUidMaxAggregateOutputType = {
    id: string | null;
    uid: string | null;
    validityDays: number | null;
    expiresAt: Date | null;
    isActive: boolean | null;
    note: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WhitelistedUidCountAggregateOutputType = {
    id: number;
    uid: number;
    validityDays: number;
    expiresAt: number;
    isActive: number;
    note: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WhitelistedUidAvgAggregateInputType = {
    validityDays?: true;
};
export type WhitelistedUidSumAggregateInputType = {
    validityDays?: true;
};
export type WhitelistedUidMinAggregateInputType = {
    id?: true;
    uid?: true;
    validityDays?: true;
    expiresAt?: true;
    isActive?: true;
    note?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WhitelistedUidMaxAggregateInputType = {
    id?: true;
    uid?: true;
    validityDays?: true;
    expiresAt?: true;
    isActive?: true;
    note?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WhitelistedUidCountAggregateInputType = {
    id?: true;
    uid?: true;
    validityDays?: true;
    expiresAt?: true;
    isActive?: true;
    note?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WhitelistedUidAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WhitelistedUid to aggregate.
     */
    where?: Prisma.WhitelistedUidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WhitelistedUids to fetch.
     */
    orderBy?: Prisma.WhitelistedUidOrderByWithRelationInput | Prisma.WhitelistedUidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.WhitelistedUidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WhitelistedUids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WhitelistedUids.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned WhitelistedUids
    **/
    _count?: true | WhitelistedUidCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: WhitelistedUidAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: WhitelistedUidSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: WhitelistedUidMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: WhitelistedUidMaxAggregateInputType;
};
export type GetWhitelistedUidAggregateType<T extends WhitelistedUidAggregateArgs> = {
    [P in keyof T & keyof AggregateWhitelistedUid]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWhitelistedUid[P]> : Prisma.GetScalarType<T[P], AggregateWhitelistedUid[P]>;
};
export type WhitelistedUidGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WhitelistedUidWhereInput;
    orderBy?: Prisma.WhitelistedUidOrderByWithAggregationInput | Prisma.WhitelistedUidOrderByWithAggregationInput[];
    by: Prisma.WhitelistedUidScalarFieldEnum[] | Prisma.WhitelistedUidScalarFieldEnum;
    having?: Prisma.WhitelistedUidScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WhitelistedUidCountAggregateInputType | true;
    _avg?: WhitelistedUidAvgAggregateInputType;
    _sum?: WhitelistedUidSumAggregateInputType;
    _min?: WhitelistedUidMinAggregateInputType;
    _max?: WhitelistedUidMaxAggregateInputType;
};
export type WhitelistedUidGroupByOutputType = {
    id: string;
    uid: string;
    validityDays: number;
    expiresAt: Date | null;
    isActive: boolean;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: WhitelistedUidCountAggregateOutputType | null;
    _avg: WhitelistedUidAvgAggregateOutputType | null;
    _sum: WhitelistedUidSumAggregateOutputType | null;
    _min: WhitelistedUidMinAggregateOutputType | null;
    _max: WhitelistedUidMaxAggregateOutputType | null;
};
export type GetWhitelistedUidGroupByPayload<T extends WhitelistedUidGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WhitelistedUidGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WhitelistedUidGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WhitelistedUidGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WhitelistedUidGroupByOutputType[P]>;
}>>;
export type WhitelistedUidWhereInput = {
    AND?: Prisma.WhitelistedUidWhereInput | Prisma.WhitelistedUidWhereInput[];
    OR?: Prisma.WhitelistedUidWhereInput[];
    NOT?: Prisma.WhitelistedUidWhereInput | Prisma.WhitelistedUidWhereInput[];
    id?: Prisma.StringFilter<"WhitelistedUid"> | string;
    uid?: Prisma.StringFilter<"WhitelistedUid"> | string;
    validityDays?: Prisma.IntFilter<"WhitelistedUid"> | number;
    expiresAt?: Prisma.DateTimeNullableFilter<"WhitelistedUid"> | Date | string | null;
    isActive?: Prisma.BoolFilter<"WhitelistedUid"> | boolean;
    note?: Prisma.StringNullableFilter<"WhitelistedUid"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WhitelistedUid"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WhitelistedUid"> | Date | string;
};
export type WhitelistedUidOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    uid?: Prisma.SortOrder;
    validityDays?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _relevance?: Prisma.WhitelistedUidOrderByRelevanceInput;
};
export type WhitelistedUidWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    uid?: string;
    AND?: Prisma.WhitelistedUidWhereInput | Prisma.WhitelistedUidWhereInput[];
    OR?: Prisma.WhitelistedUidWhereInput[];
    NOT?: Prisma.WhitelistedUidWhereInput | Prisma.WhitelistedUidWhereInput[];
    validityDays?: Prisma.IntFilter<"WhitelistedUid"> | number;
    expiresAt?: Prisma.DateTimeNullableFilter<"WhitelistedUid"> | Date | string | null;
    isActive?: Prisma.BoolFilter<"WhitelistedUid"> | boolean;
    note?: Prisma.StringNullableFilter<"WhitelistedUid"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WhitelistedUid"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WhitelistedUid"> | Date | string;
}, "id" | "uid">;
export type WhitelistedUidOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    uid?: Prisma.SortOrder;
    validityDays?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WhitelistedUidCountOrderByAggregateInput;
    _avg?: Prisma.WhitelistedUidAvgOrderByAggregateInput;
    _max?: Prisma.WhitelistedUidMaxOrderByAggregateInput;
    _min?: Prisma.WhitelistedUidMinOrderByAggregateInput;
    _sum?: Prisma.WhitelistedUidSumOrderByAggregateInput;
};
export type WhitelistedUidScalarWhereWithAggregatesInput = {
    AND?: Prisma.WhitelistedUidScalarWhereWithAggregatesInput | Prisma.WhitelistedUidScalarWhereWithAggregatesInput[];
    OR?: Prisma.WhitelistedUidScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WhitelistedUidScalarWhereWithAggregatesInput | Prisma.WhitelistedUidScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WhitelistedUid"> | string;
    uid?: Prisma.StringWithAggregatesFilter<"WhitelistedUid"> | string;
    validityDays?: Prisma.IntWithAggregatesFilter<"WhitelistedUid"> | number;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WhitelistedUid"> | Date | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"WhitelistedUid"> | boolean;
    note?: Prisma.StringNullableWithAggregatesFilter<"WhitelistedUid"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WhitelistedUid"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WhitelistedUid"> | Date | string;
};
export type WhitelistedUidCreateInput = {
    id?: string;
    uid: string;
    validityDays?: number;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WhitelistedUidUncheckedCreateInput = {
    id?: string;
    uid: string;
    validityDays?: number;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WhitelistedUidUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    validityDays?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WhitelistedUidUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    validityDays?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WhitelistedUidCreateManyInput = {
    id?: string;
    uid: string;
    validityDays?: number;
    expiresAt?: Date | string | null;
    isActive?: boolean;
    note?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WhitelistedUidUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    validityDays?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WhitelistedUidUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    uid?: Prisma.StringFieldUpdateOperationsInput | string;
    validityDays?: Prisma.IntFieldUpdateOperationsInput | number;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WhitelistedUidOrderByRelevanceInput = {
    fields: Prisma.WhitelistedUidOrderByRelevanceFieldEnum | Prisma.WhitelistedUidOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type WhitelistedUidCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uid?: Prisma.SortOrder;
    validityDays?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WhitelistedUidAvgOrderByAggregateInput = {
    validityDays?: Prisma.SortOrder;
};
export type WhitelistedUidMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uid?: Prisma.SortOrder;
    validityDays?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WhitelistedUidMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    uid?: Prisma.SortOrder;
    validityDays?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WhitelistedUidSumOrderByAggregateInput = {
    validityDays?: Prisma.SortOrder;
};
export type WhitelistedUidSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    uid?: boolean;
    validityDays?: boolean;
    expiresAt?: boolean;
    isActive?: boolean;
    note?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["whitelistedUid"]>;
export type WhitelistedUidSelectScalar = {
    id?: boolean;
    uid?: boolean;
    validityDays?: boolean;
    expiresAt?: boolean;
    isActive?: boolean;
    note?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WhitelistedUidOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "uid" | "validityDays" | "expiresAt" | "isActive" | "note" | "createdAt" | "updatedAt", ExtArgs["result"]["whitelistedUid"]>;
export type $WhitelistedUidPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WhitelistedUid";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        uid: string;
        validityDays: number;
        expiresAt: Date | null;
        isActive: boolean;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["whitelistedUid"]>;
    composites: {};
};
export type WhitelistedUidGetPayload<S extends boolean | null | undefined | WhitelistedUidDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WhitelistedUidPayload, S>;
export type WhitelistedUidCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WhitelistedUidFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WhitelistedUidCountAggregateInputType | true;
};
export interface WhitelistedUidDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WhitelistedUid'];
        meta: {
            name: 'WhitelistedUid';
        };
    };
    /**
     * Find zero or one WhitelistedUid that matches the filter.
     * @param {WhitelistedUidFindUniqueArgs} args - Arguments to find a WhitelistedUid
     * @example
     * // Get one WhitelistedUid
     * const whitelistedUid = await prisma.whitelistedUid.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WhitelistedUidFindUniqueArgs>(args: Prisma.SelectSubset<T, WhitelistedUidFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WhitelistedUidClient<runtime.Types.Result.GetResult<Prisma.$WhitelistedUidPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one WhitelistedUid that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WhitelistedUidFindUniqueOrThrowArgs} args - Arguments to find a WhitelistedUid
     * @example
     * // Get one WhitelistedUid
     * const whitelistedUid = await prisma.whitelistedUid.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WhitelistedUidFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WhitelistedUidFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WhitelistedUidClient<runtime.Types.Result.GetResult<Prisma.$WhitelistedUidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WhitelistedUid that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhitelistedUidFindFirstArgs} args - Arguments to find a WhitelistedUid
     * @example
     * // Get one WhitelistedUid
     * const whitelistedUid = await prisma.whitelistedUid.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WhitelistedUidFindFirstArgs>(args?: Prisma.SelectSubset<T, WhitelistedUidFindFirstArgs<ExtArgs>>): Prisma.Prisma__WhitelistedUidClient<runtime.Types.Result.GetResult<Prisma.$WhitelistedUidPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first WhitelistedUid that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhitelistedUidFindFirstOrThrowArgs} args - Arguments to find a WhitelistedUid
     * @example
     * // Get one WhitelistedUid
     * const whitelistedUid = await prisma.whitelistedUid.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WhitelistedUidFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WhitelistedUidFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WhitelistedUidClient<runtime.Types.Result.GetResult<Prisma.$WhitelistedUidPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more WhitelistedUids that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhitelistedUidFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WhitelistedUids
     * const whitelistedUids = await prisma.whitelistedUid.findMany()
     *
     * // Get first 10 WhitelistedUids
     * const whitelistedUids = await prisma.whitelistedUid.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const whitelistedUidWithIdOnly = await prisma.whitelistedUid.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WhitelistedUidFindManyArgs>(args?: Prisma.SelectSubset<T, WhitelistedUidFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WhitelistedUidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a WhitelistedUid.
     * @param {WhitelistedUidCreateArgs} args - Arguments to create a WhitelistedUid.
     * @example
     * // Create one WhitelistedUid
     * const WhitelistedUid = await prisma.whitelistedUid.create({
     *   data: {
     *     // ... data to create a WhitelistedUid
     *   }
     * })
     *
     */
    create<T extends WhitelistedUidCreateArgs>(args: Prisma.SelectSubset<T, WhitelistedUidCreateArgs<ExtArgs>>): Prisma.Prisma__WhitelistedUidClient<runtime.Types.Result.GetResult<Prisma.$WhitelistedUidPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many WhitelistedUids.
     * @param {WhitelistedUidCreateManyArgs} args - Arguments to create many WhitelistedUids.
     * @example
     * // Create many WhitelistedUids
     * const whitelistedUid = await prisma.whitelistedUid.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WhitelistedUidCreateManyArgs>(args?: Prisma.SelectSubset<T, WhitelistedUidCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a WhitelistedUid.
     * @param {WhitelistedUidDeleteArgs} args - Arguments to delete one WhitelistedUid.
     * @example
     * // Delete one WhitelistedUid
     * const WhitelistedUid = await prisma.whitelistedUid.delete({
     *   where: {
     *     // ... filter to delete one WhitelistedUid
     *   }
     * })
     *
     */
    delete<T extends WhitelistedUidDeleteArgs>(args: Prisma.SelectSubset<T, WhitelistedUidDeleteArgs<ExtArgs>>): Prisma.Prisma__WhitelistedUidClient<runtime.Types.Result.GetResult<Prisma.$WhitelistedUidPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one WhitelistedUid.
     * @param {WhitelistedUidUpdateArgs} args - Arguments to update one WhitelistedUid.
     * @example
     * // Update one WhitelistedUid
     * const whitelistedUid = await prisma.whitelistedUid.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WhitelistedUidUpdateArgs>(args: Prisma.SelectSubset<T, WhitelistedUidUpdateArgs<ExtArgs>>): Prisma.Prisma__WhitelistedUidClient<runtime.Types.Result.GetResult<Prisma.$WhitelistedUidPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more WhitelistedUids.
     * @param {WhitelistedUidDeleteManyArgs} args - Arguments to filter WhitelistedUids to delete.
     * @example
     * // Delete a few WhitelistedUids
     * const { count } = await prisma.whitelistedUid.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WhitelistedUidDeleteManyArgs>(args?: Prisma.SelectSubset<T, WhitelistedUidDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more WhitelistedUids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhitelistedUidUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WhitelistedUids
     * const whitelistedUid = await prisma.whitelistedUid.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WhitelistedUidUpdateManyArgs>(args: Prisma.SelectSubset<T, WhitelistedUidUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one WhitelistedUid.
     * @param {WhitelistedUidUpsertArgs} args - Arguments to update or create a WhitelistedUid.
     * @example
     * // Update or create a WhitelistedUid
     * const whitelistedUid = await prisma.whitelistedUid.upsert({
     *   create: {
     *     // ... data to create a WhitelistedUid
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WhitelistedUid we want to update
     *   }
     * })
     */
    upsert<T extends WhitelistedUidUpsertArgs>(args: Prisma.SelectSubset<T, WhitelistedUidUpsertArgs<ExtArgs>>): Prisma.Prisma__WhitelistedUidClient<runtime.Types.Result.GetResult<Prisma.$WhitelistedUidPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of WhitelistedUids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhitelistedUidCountArgs} args - Arguments to filter WhitelistedUids to count.
     * @example
     * // Count the number of WhitelistedUids
     * const count = await prisma.whitelistedUid.count({
     *   where: {
     *     // ... the filter for the WhitelistedUids we want to count
     *   }
     * })
    **/
    count<T extends WhitelistedUidCountArgs>(args?: Prisma.Subset<T, WhitelistedUidCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WhitelistedUidCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a WhitelistedUid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhitelistedUidAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WhitelistedUidAggregateArgs>(args: Prisma.Subset<T, WhitelistedUidAggregateArgs>): Prisma.PrismaPromise<GetWhitelistedUidAggregateType<T>>;
    /**
     * Group by WhitelistedUid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhitelistedUidGroupByArgs} args - Group by arguments.
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
    groupBy<T extends WhitelistedUidGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WhitelistedUidGroupByArgs['orderBy'];
    } : {
        orderBy?: WhitelistedUidGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WhitelistedUidGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWhitelistedUidGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the WhitelistedUid model
     */
    readonly fields: WhitelistedUidFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for WhitelistedUid.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__WhitelistedUidClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the WhitelistedUid model
 */
export interface WhitelistedUidFieldRefs {
    readonly id: Prisma.FieldRef<"WhitelistedUid", 'String'>;
    readonly uid: Prisma.FieldRef<"WhitelistedUid", 'String'>;
    readonly validityDays: Prisma.FieldRef<"WhitelistedUid", 'Int'>;
    readonly expiresAt: Prisma.FieldRef<"WhitelistedUid", 'DateTime'>;
    readonly isActive: Prisma.FieldRef<"WhitelistedUid", 'Boolean'>;
    readonly note: Prisma.FieldRef<"WhitelistedUid", 'String'>;
    readonly createdAt: Prisma.FieldRef<"WhitelistedUid", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WhitelistedUid", 'DateTime'>;
}
/**
 * WhitelistedUid findUnique
 */
export type WhitelistedUidFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhitelistedUid
     */
    select?: Prisma.WhitelistedUidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WhitelistedUid
     */
    omit?: Prisma.WhitelistedUidOmit<ExtArgs> | null;
    /**
     * Filter, which WhitelistedUid to fetch.
     */
    where: Prisma.WhitelistedUidWhereUniqueInput;
};
/**
 * WhitelistedUid findUniqueOrThrow
 */
export type WhitelistedUidFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhitelistedUid
     */
    select?: Prisma.WhitelistedUidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WhitelistedUid
     */
    omit?: Prisma.WhitelistedUidOmit<ExtArgs> | null;
    /**
     * Filter, which WhitelistedUid to fetch.
     */
    where: Prisma.WhitelistedUidWhereUniqueInput;
};
/**
 * WhitelistedUid findFirst
 */
export type WhitelistedUidFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhitelistedUid
     */
    select?: Prisma.WhitelistedUidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WhitelistedUid
     */
    omit?: Prisma.WhitelistedUidOmit<ExtArgs> | null;
    /**
     * Filter, which WhitelistedUid to fetch.
     */
    where?: Prisma.WhitelistedUidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WhitelistedUids to fetch.
     */
    orderBy?: Prisma.WhitelistedUidOrderByWithRelationInput | Prisma.WhitelistedUidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WhitelistedUids.
     */
    cursor?: Prisma.WhitelistedUidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WhitelistedUids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WhitelistedUids.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WhitelistedUids.
     */
    distinct?: Prisma.WhitelistedUidScalarFieldEnum | Prisma.WhitelistedUidScalarFieldEnum[];
};
/**
 * WhitelistedUid findFirstOrThrow
 */
export type WhitelistedUidFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhitelistedUid
     */
    select?: Prisma.WhitelistedUidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WhitelistedUid
     */
    omit?: Prisma.WhitelistedUidOmit<ExtArgs> | null;
    /**
     * Filter, which WhitelistedUid to fetch.
     */
    where?: Prisma.WhitelistedUidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WhitelistedUids to fetch.
     */
    orderBy?: Prisma.WhitelistedUidOrderByWithRelationInput | Prisma.WhitelistedUidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for WhitelistedUids.
     */
    cursor?: Prisma.WhitelistedUidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WhitelistedUids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WhitelistedUids.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WhitelistedUids.
     */
    distinct?: Prisma.WhitelistedUidScalarFieldEnum | Prisma.WhitelistedUidScalarFieldEnum[];
};
/**
 * WhitelistedUid findMany
 */
export type WhitelistedUidFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhitelistedUid
     */
    select?: Prisma.WhitelistedUidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WhitelistedUid
     */
    omit?: Prisma.WhitelistedUidOmit<ExtArgs> | null;
    /**
     * Filter, which WhitelistedUids to fetch.
     */
    where?: Prisma.WhitelistedUidWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of WhitelistedUids to fetch.
     */
    orderBy?: Prisma.WhitelistedUidOrderByWithRelationInput | Prisma.WhitelistedUidOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing WhitelistedUids.
     */
    cursor?: Prisma.WhitelistedUidWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` WhitelistedUids from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` WhitelistedUids.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of WhitelistedUids.
     */
    distinct?: Prisma.WhitelistedUidScalarFieldEnum | Prisma.WhitelistedUidScalarFieldEnum[];
};
/**
 * WhitelistedUid create
 */
export type WhitelistedUidCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhitelistedUid
     */
    select?: Prisma.WhitelistedUidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WhitelistedUid
     */
    omit?: Prisma.WhitelistedUidOmit<ExtArgs> | null;
    /**
     * The data needed to create a WhitelistedUid.
     */
    data: Prisma.XOR<Prisma.WhitelistedUidCreateInput, Prisma.WhitelistedUidUncheckedCreateInput>;
};
/**
 * WhitelistedUid createMany
 */
export type WhitelistedUidCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many WhitelistedUids.
     */
    data: Prisma.WhitelistedUidCreateManyInput | Prisma.WhitelistedUidCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * WhitelistedUid update
 */
export type WhitelistedUidUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhitelistedUid
     */
    select?: Prisma.WhitelistedUidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WhitelistedUid
     */
    omit?: Prisma.WhitelistedUidOmit<ExtArgs> | null;
    /**
     * The data needed to update a WhitelistedUid.
     */
    data: Prisma.XOR<Prisma.WhitelistedUidUpdateInput, Prisma.WhitelistedUidUncheckedUpdateInput>;
    /**
     * Choose, which WhitelistedUid to update.
     */
    where: Prisma.WhitelistedUidWhereUniqueInput;
};
/**
 * WhitelistedUid updateMany
 */
export type WhitelistedUidUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update WhitelistedUids.
     */
    data: Prisma.XOR<Prisma.WhitelistedUidUpdateManyMutationInput, Prisma.WhitelistedUidUncheckedUpdateManyInput>;
    /**
     * Filter which WhitelistedUids to update
     */
    where?: Prisma.WhitelistedUidWhereInput;
    /**
     * Limit how many WhitelistedUids to update.
     */
    limit?: number;
};
/**
 * WhitelistedUid upsert
 */
export type WhitelistedUidUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhitelistedUid
     */
    select?: Prisma.WhitelistedUidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WhitelistedUid
     */
    omit?: Prisma.WhitelistedUidOmit<ExtArgs> | null;
    /**
     * The filter to search for the WhitelistedUid to update in case it exists.
     */
    where: Prisma.WhitelistedUidWhereUniqueInput;
    /**
     * In case the WhitelistedUid found by the `where` argument doesn't exist, create a new WhitelistedUid with this data.
     */
    create: Prisma.XOR<Prisma.WhitelistedUidCreateInput, Prisma.WhitelistedUidUncheckedCreateInput>;
    /**
     * In case the WhitelistedUid was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.WhitelistedUidUpdateInput, Prisma.WhitelistedUidUncheckedUpdateInput>;
};
/**
 * WhitelistedUid delete
 */
export type WhitelistedUidDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhitelistedUid
     */
    select?: Prisma.WhitelistedUidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WhitelistedUid
     */
    omit?: Prisma.WhitelistedUidOmit<ExtArgs> | null;
    /**
     * Filter which WhitelistedUid to delete.
     */
    where: Prisma.WhitelistedUidWhereUniqueInput;
};
/**
 * WhitelistedUid deleteMany
 */
export type WhitelistedUidDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which WhitelistedUids to delete
     */
    where?: Prisma.WhitelistedUidWhereInput;
    /**
     * Limit how many WhitelistedUids to delete.
     */
    limit?: number;
};
/**
 * WhitelistedUid without action
 */
export type WhitelistedUidDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WhitelistedUid
     */
    select?: Prisma.WhitelistedUidSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WhitelistedUid
     */
    omit?: Prisma.WhitelistedUidOmit<ExtArgs> | null;
};
