import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ResellerHistory
 *
 */
export type ResellerHistoryModel = runtime.Types.Result.DefaultSelection<Prisma.$ResellerHistoryPayload>;
export type AggregateResellerHistory = {
    _count: ResellerHistoryCountAggregateOutputType | null;
    _min: ResellerHistoryMinAggregateOutputType | null;
    _max: ResellerHistoryMaxAggregateOutputType | null;
};
export type ResellerHistoryMinAggregateOutputType = {
    id: string | null;
    resellerId: string | null;
    type: string | null;
    description: string | null;
    actor: string | null;
    metadata: string | null;
    createdAt: Date | null;
};
export type ResellerHistoryMaxAggregateOutputType = {
    id: string | null;
    resellerId: string | null;
    type: string | null;
    description: string | null;
    actor: string | null;
    metadata: string | null;
    createdAt: Date | null;
};
export type ResellerHistoryCountAggregateOutputType = {
    id: number;
    resellerId: number;
    type: number;
    description: number;
    actor: number;
    metadata: number;
    createdAt: number;
    _all: number;
};
export type ResellerHistoryMinAggregateInputType = {
    id?: true;
    resellerId?: true;
    type?: true;
    description?: true;
    actor?: true;
    metadata?: true;
    createdAt?: true;
};
export type ResellerHistoryMaxAggregateInputType = {
    id?: true;
    resellerId?: true;
    type?: true;
    description?: true;
    actor?: true;
    metadata?: true;
    createdAt?: true;
};
export type ResellerHistoryCountAggregateInputType = {
    id?: true;
    resellerId?: true;
    type?: true;
    description?: true;
    actor?: true;
    metadata?: true;
    createdAt?: true;
    _all?: true;
};
export type ResellerHistoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ResellerHistory to aggregate.
     */
    where?: Prisma.ResellerHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResellerHistories to fetch.
     */
    orderBy?: Prisma.ResellerHistoryOrderByWithRelationInput | Prisma.ResellerHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ResellerHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResellerHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResellerHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ResellerHistories
    **/
    _count?: true | ResellerHistoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ResellerHistoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ResellerHistoryMaxAggregateInputType;
};
export type GetResellerHistoryAggregateType<T extends ResellerHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateResellerHistory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateResellerHistory[P]> : Prisma.GetScalarType<T[P], AggregateResellerHistory[P]>;
};
export type ResellerHistoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResellerHistoryWhereInput;
    orderBy?: Prisma.ResellerHistoryOrderByWithAggregationInput | Prisma.ResellerHistoryOrderByWithAggregationInput[];
    by: Prisma.ResellerHistoryScalarFieldEnum[] | Prisma.ResellerHistoryScalarFieldEnum;
    having?: Prisma.ResellerHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ResellerHistoryCountAggregateInputType | true;
    _min?: ResellerHistoryMinAggregateInputType;
    _max?: ResellerHistoryMaxAggregateInputType;
};
export type ResellerHistoryGroupByOutputType = {
    id: string;
    resellerId: string;
    type: string;
    description: string;
    actor: string;
    metadata: string | null;
    createdAt: Date;
    _count: ResellerHistoryCountAggregateOutputType | null;
    _min: ResellerHistoryMinAggregateOutputType | null;
    _max: ResellerHistoryMaxAggregateOutputType | null;
};
export type GetResellerHistoryGroupByPayload<T extends ResellerHistoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ResellerHistoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ResellerHistoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ResellerHistoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ResellerHistoryGroupByOutputType[P]>;
}>>;
export type ResellerHistoryWhereInput = {
    AND?: Prisma.ResellerHistoryWhereInput | Prisma.ResellerHistoryWhereInput[];
    OR?: Prisma.ResellerHistoryWhereInput[];
    NOT?: Prisma.ResellerHistoryWhereInput | Prisma.ResellerHistoryWhereInput[];
    id?: Prisma.StringFilter<"ResellerHistory"> | string;
    resellerId?: Prisma.StringFilter<"ResellerHistory"> | string;
    type?: Prisma.StringFilter<"ResellerHistory"> | string;
    description?: Prisma.StringFilter<"ResellerHistory"> | string;
    actor?: Prisma.StringFilter<"ResellerHistory"> | string;
    metadata?: Prisma.StringNullableFilter<"ResellerHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ResellerHistory"> | Date | string;
    reseller?: Prisma.XOR<Prisma.ResellerScalarRelationFilter, Prisma.ResellerWhereInput>;
};
export type ResellerHistoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    resellerId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    actor?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    reseller?: Prisma.ResellerOrderByWithRelationInput;
    _relevance?: Prisma.ResellerHistoryOrderByRelevanceInput;
};
export type ResellerHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ResellerHistoryWhereInput | Prisma.ResellerHistoryWhereInput[];
    OR?: Prisma.ResellerHistoryWhereInput[];
    NOT?: Prisma.ResellerHistoryWhereInput | Prisma.ResellerHistoryWhereInput[];
    resellerId?: Prisma.StringFilter<"ResellerHistory"> | string;
    type?: Prisma.StringFilter<"ResellerHistory"> | string;
    description?: Prisma.StringFilter<"ResellerHistory"> | string;
    actor?: Prisma.StringFilter<"ResellerHistory"> | string;
    metadata?: Prisma.StringNullableFilter<"ResellerHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ResellerHistory"> | Date | string;
    reseller?: Prisma.XOR<Prisma.ResellerScalarRelationFilter, Prisma.ResellerWhereInput>;
}, "id">;
export type ResellerHistoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    resellerId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    actor?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ResellerHistoryCountOrderByAggregateInput;
    _max?: Prisma.ResellerHistoryMaxOrderByAggregateInput;
    _min?: Prisma.ResellerHistoryMinOrderByAggregateInput;
};
export type ResellerHistoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.ResellerHistoryScalarWhereWithAggregatesInput | Prisma.ResellerHistoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.ResellerHistoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ResellerHistoryScalarWhereWithAggregatesInput | Prisma.ResellerHistoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ResellerHistory"> | string;
    resellerId?: Prisma.StringWithAggregatesFilter<"ResellerHistory"> | string;
    type?: Prisma.StringWithAggregatesFilter<"ResellerHistory"> | string;
    description?: Prisma.StringWithAggregatesFilter<"ResellerHistory"> | string;
    actor?: Prisma.StringWithAggregatesFilter<"ResellerHistory"> | string;
    metadata?: Prisma.StringNullableWithAggregatesFilter<"ResellerHistory"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ResellerHistory"> | Date | string;
};
export type ResellerHistoryCreateInput = {
    id?: string;
    type: string;
    description: string;
    actor?: string;
    metadata?: string | null;
    createdAt?: Date | string;
    reseller: Prisma.ResellerCreateNestedOneWithoutHistoryInput;
};
export type ResellerHistoryUncheckedCreateInput = {
    id?: string;
    resellerId: string;
    type: string;
    description: string;
    actor?: string;
    metadata?: string | null;
    createdAt?: Date | string;
};
export type ResellerHistoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reseller?: Prisma.ResellerUpdateOneRequiredWithoutHistoryNestedInput;
};
export type ResellerHistoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resellerId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResellerHistoryCreateManyInput = {
    id?: string;
    resellerId: string;
    type: string;
    description: string;
    actor?: string;
    metadata?: string | null;
    createdAt?: Date | string;
};
export type ResellerHistoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResellerHistoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resellerId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResellerHistoryListRelationFilter = {
    every?: Prisma.ResellerHistoryWhereInput;
    some?: Prisma.ResellerHistoryWhereInput;
    none?: Prisma.ResellerHistoryWhereInput;
};
export type ResellerHistoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ResellerHistoryOrderByRelevanceInput = {
    fields: Prisma.ResellerHistoryOrderByRelevanceFieldEnum | Prisma.ResellerHistoryOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ResellerHistoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    resellerId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    actor?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ResellerHistoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    resellerId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    actor?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ResellerHistoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    resellerId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    actor?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ResellerHistoryCreateNestedManyWithoutResellerInput = {
    create?: Prisma.XOR<Prisma.ResellerHistoryCreateWithoutResellerInput, Prisma.ResellerHistoryUncheckedCreateWithoutResellerInput> | Prisma.ResellerHistoryCreateWithoutResellerInput[] | Prisma.ResellerHistoryUncheckedCreateWithoutResellerInput[];
    connectOrCreate?: Prisma.ResellerHistoryCreateOrConnectWithoutResellerInput | Prisma.ResellerHistoryCreateOrConnectWithoutResellerInput[];
    createMany?: Prisma.ResellerHistoryCreateManyResellerInputEnvelope;
    connect?: Prisma.ResellerHistoryWhereUniqueInput | Prisma.ResellerHistoryWhereUniqueInput[];
};
export type ResellerHistoryUncheckedCreateNestedManyWithoutResellerInput = {
    create?: Prisma.XOR<Prisma.ResellerHistoryCreateWithoutResellerInput, Prisma.ResellerHistoryUncheckedCreateWithoutResellerInput> | Prisma.ResellerHistoryCreateWithoutResellerInput[] | Prisma.ResellerHistoryUncheckedCreateWithoutResellerInput[];
    connectOrCreate?: Prisma.ResellerHistoryCreateOrConnectWithoutResellerInput | Prisma.ResellerHistoryCreateOrConnectWithoutResellerInput[];
    createMany?: Prisma.ResellerHistoryCreateManyResellerInputEnvelope;
    connect?: Prisma.ResellerHistoryWhereUniqueInput | Prisma.ResellerHistoryWhereUniqueInput[];
};
export type ResellerHistoryUpdateManyWithoutResellerNestedInput = {
    create?: Prisma.XOR<Prisma.ResellerHistoryCreateWithoutResellerInput, Prisma.ResellerHistoryUncheckedCreateWithoutResellerInput> | Prisma.ResellerHistoryCreateWithoutResellerInput[] | Prisma.ResellerHistoryUncheckedCreateWithoutResellerInput[];
    connectOrCreate?: Prisma.ResellerHistoryCreateOrConnectWithoutResellerInput | Prisma.ResellerHistoryCreateOrConnectWithoutResellerInput[];
    upsert?: Prisma.ResellerHistoryUpsertWithWhereUniqueWithoutResellerInput | Prisma.ResellerHistoryUpsertWithWhereUniqueWithoutResellerInput[];
    createMany?: Prisma.ResellerHistoryCreateManyResellerInputEnvelope;
    set?: Prisma.ResellerHistoryWhereUniqueInput | Prisma.ResellerHistoryWhereUniqueInput[];
    disconnect?: Prisma.ResellerHistoryWhereUniqueInput | Prisma.ResellerHistoryWhereUniqueInput[];
    delete?: Prisma.ResellerHistoryWhereUniqueInput | Prisma.ResellerHistoryWhereUniqueInput[];
    connect?: Prisma.ResellerHistoryWhereUniqueInput | Prisma.ResellerHistoryWhereUniqueInput[];
    update?: Prisma.ResellerHistoryUpdateWithWhereUniqueWithoutResellerInput | Prisma.ResellerHistoryUpdateWithWhereUniqueWithoutResellerInput[];
    updateMany?: Prisma.ResellerHistoryUpdateManyWithWhereWithoutResellerInput | Prisma.ResellerHistoryUpdateManyWithWhereWithoutResellerInput[];
    deleteMany?: Prisma.ResellerHistoryScalarWhereInput | Prisma.ResellerHistoryScalarWhereInput[];
};
export type ResellerHistoryUncheckedUpdateManyWithoutResellerNestedInput = {
    create?: Prisma.XOR<Prisma.ResellerHistoryCreateWithoutResellerInput, Prisma.ResellerHistoryUncheckedCreateWithoutResellerInput> | Prisma.ResellerHistoryCreateWithoutResellerInput[] | Prisma.ResellerHistoryUncheckedCreateWithoutResellerInput[];
    connectOrCreate?: Prisma.ResellerHistoryCreateOrConnectWithoutResellerInput | Prisma.ResellerHistoryCreateOrConnectWithoutResellerInput[];
    upsert?: Prisma.ResellerHistoryUpsertWithWhereUniqueWithoutResellerInput | Prisma.ResellerHistoryUpsertWithWhereUniqueWithoutResellerInput[];
    createMany?: Prisma.ResellerHistoryCreateManyResellerInputEnvelope;
    set?: Prisma.ResellerHistoryWhereUniqueInput | Prisma.ResellerHistoryWhereUniqueInput[];
    disconnect?: Prisma.ResellerHistoryWhereUniqueInput | Prisma.ResellerHistoryWhereUniqueInput[];
    delete?: Prisma.ResellerHistoryWhereUniqueInput | Prisma.ResellerHistoryWhereUniqueInput[];
    connect?: Prisma.ResellerHistoryWhereUniqueInput | Prisma.ResellerHistoryWhereUniqueInput[];
    update?: Prisma.ResellerHistoryUpdateWithWhereUniqueWithoutResellerInput | Prisma.ResellerHistoryUpdateWithWhereUniqueWithoutResellerInput[];
    updateMany?: Prisma.ResellerHistoryUpdateManyWithWhereWithoutResellerInput | Prisma.ResellerHistoryUpdateManyWithWhereWithoutResellerInput[];
    deleteMany?: Prisma.ResellerHistoryScalarWhereInput | Prisma.ResellerHistoryScalarWhereInput[];
};
export type ResellerHistoryCreateWithoutResellerInput = {
    id?: string;
    type: string;
    description: string;
    actor?: string;
    metadata?: string | null;
    createdAt?: Date | string;
};
export type ResellerHistoryUncheckedCreateWithoutResellerInput = {
    id?: string;
    type: string;
    description: string;
    actor?: string;
    metadata?: string | null;
    createdAt?: Date | string;
};
export type ResellerHistoryCreateOrConnectWithoutResellerInput = {
    where: Prisma.ResellerHistoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.ResellerHistoryCreateWithoutResellerInput, Prisma.ResellerHistoryUncheckedCreateWithoutResellerInput>;
};
export type ResellerHistoryCreateManyResellerInputEnvelope = {
    data: Prisma.ResellerHistoryCreateManyResellerInput | Prisma.ResellerHistoryCreateManyResellerInput[];
    skipDuplicates?: boolean;
};
export type ResellerHistoryUpsertWithWhereUniqueWithoutResellerInput = {
    where: Prisma.ResellerHistoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.ResellerHistoryUpdateWithoutResellerInput, Prisma.ResellerHistoryUncheckedUpdateWithoutResellerInput>;
    create: Prisma.XOR<Prisma.ResellerHistoryCreateWithoutResellerInput, Prisma.ResellerHistoryUncheckedCreateWithoutResellerInput>;
};
export type ResellerHistoryUpdateWithWhereUniqueWithoutResellerInput = {
    where: Prisma.ResellerHistoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.ResellerHistoryUpdateWithoutResellerInput, Prisma.ResellerHistoryUncheckedUpdateWithoutResellerInput>;
};
export type ResellerHistoryUpdateManyWithWhereWithoutResellerInput = {
    where: Prisma.ResellerHistoryScalarWhereInput;
    data: Prisma.XOR<Prisma.ResellerHistoryUpdateManyMutationInput, Prisma.ResellerHistoryUncheckedUpdateManyWithoutResellerInput>;
};
export type ResellerHistoryScalarWhereInput = {
    AND?: Prisma.ResellerHistoryScalarWhereInput | Prisma.ResellerHistoryScalarWhereInput[];
    OR?: Prisma.ResellerHistoryScalarWhereInput[];
    NOT?: Prisma.ResellerHistoryScalarWhereInput | Prisma.ResellerHistoryScalarWhereInput[];
    id?: Prisma.StringFilter<"ResellerHistory"> | string;
    resellerId?: Prisma.StringFilter<"ResellerHistory"> | string;
    type?: Prisma.StringFilter<"ResellerHistory"> | string;
    description?: Prisma.StringFilter<"ResellerHistory"> | string;
    actor?: Prisma.StringFilter<"ResellerHistory"> | string;
    metadata?: Prisma.StringNullableFilter<"ResellerHistory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ResellerHistory"> | Date | string;
};
export type ResellerHistoryCreateManyResellerInput = {
    id?: string;
    type: string;
    description: string;
    actor?: string;
    metadata?: string | null;
    createdAt?: Date | string;
};
export type ResellerHistoryUpdateWithoutResellerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResellerHistoryUncheckedUpdateWithoutResellerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResellerHistoryUncheckedUpdateManyWithoutResellerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    actor?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResellerHistorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    resellerId?: boolean;
    type?: boolean;
    description?: boolean;
    actor?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    reseller?: boolean | Prisma.ResellerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["resellerHistory"]>;
export type ResellerHistorySelectScalar = {
    id?: boolean;
    resellerId?: boolean;
    type?: boolean;
    description?: boolean;
    actor?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
};
export type ResellerHistoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "resellerId" | "type" | "description" | "actor" | "metadata" | "createdAt", ExtArgs["result"]["resellerHistory"]>;
export type ResellerHistoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reseller?: boolean | Prisma.ResellerDefaultArgs<ExtArgs>;
};
export type $ResellerHistoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ResellerHistory";
    objects: {
        reseller: Prisma.$ResellerPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        resellerId: string;
        type: string;
        description: string;
        actor: string;
        metadata: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["resellerHistory"]>;
    composites: {};
};
export type ResellerHistoryGetPayload<S extends boolean | null | undefined | ResellerHistoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ResellerHistoryPayload, S>;
export type ResellerHistoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ResellerHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ResellerHistoryCountAggregateInputType | true;
};
export interface ResellerHistoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ResellerHistory'];
        meta: {
            name: 'ResellerHistory';
        };
    };
    /**
     * Find zero or one ResellerHistory that matches the filter.
     * @param {ResellerHistoryFindUniqueArgs} args - Arguments to find a ResellerHistory
     * @example
     * // Get one ResellerHistory
     * const resellerHistory = await prisma.resellerHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResellerHistoryFindUniqueArgs>(args: Prisma.SelectSubset<T, ResellerHistoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ResellerHistoryClient<runtime.Types.Result.GetResult<Prisma.$ResellerHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ResellerHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResellerHistoryFindUniqueOrThrowArgs} args - Arguments to find a ResellerHistory
     * @example
     * // Get one ResellerHistory
     * const resellerHistory = await prisma.resellerHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResellerHistoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ResellerHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResellerHistoryClient<runtime.Types.Result.GetResult<Prisma.$ResellerHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ResellerHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerHistoryFindFirstArgs} args - Arguments to find a ResellerHistory
     * @example
     * // Get one ResellerHistory
     * const resellerHistory = await prisma.resellerHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResellerHistoryFindFirstArgs>(args?: Prisma.SelectSubset<T, ResellerHistoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__ResellerHistoryClient<runtime.Types.Result.GetResult<Prisma.$ResellerHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ResellerHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerHistoryFindFirstOrThrowArgs} args - Arguments to find a ResellerHistory
     * @example
     * // Get one ResellerHistory
     * const resellerHistory = await prisma.resellerHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResellerHistoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ResellerHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResellerHistoryClient<runtime.Types.Result.GetResult<Prisma.$ResellerHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ResellerHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResellerHistories
     * const resellerHistories = await prisma.resellerHistory.findMany()
     *
     * // Get first 10 ResellerHistories
     * const resellerHistories = await prisma.resellerHistory.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const resellerHistoryWithIdOnly = await prisma.resellerHistory.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ResellerHistoryFindManyArgs>(args?: Prisma.SelectSubset<T, ResellerHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResellerHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ResellerHistory.
     * @param {ResellerHistoryCreateArgs} args - Arguments to create a ResellerHistory.
     * @example
     * // Create one ResellerHistory
     * const ResellerHistory = await prisma.resellerHistory.create({
     *   data: {
     *     // ... data to create a ResellerHistory
     *   }
     * })
     *
     */
    create<T extends ResellerHistoryCreateArgs>(args: Prisma.SelectSubset<T, ResellerHistoryCreateArgs<ExtArgs>>): Prisma.Prisma__ResellerHistoryClient<runtime.Types.Result.GetResult<Prisma.$ResellerHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ResellerHistories.
     * @param {ResellerHistoryCreateManyArgs} args - Arguments to create many ResellerHistories.
     * @example
     * // Create many ResellerHistories
     * const resellerHistory = await prisma.resellerHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ResellerHistoryCreateManyArgs>(args?: Prisma.SelectSubset<T, ResellerHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a ResellerHistory.
     * @param {ResellerHistoryDeleteArgs} args - Arguments to delete one ResellerHistory.
     * @example
     * // Delete one ResellerHistory
     * const ResellerHistory = await prisma.resellerHistory.delete({
     *   where: {
     *     // ... filter to delete one ResellerHistory
     *   }
     * })
     *
     */
    delete<T extends ResellerHistoryDeleteArgs>(args: Prisma.SelectSubset<T, ResellerHistoryDeleteArgs<ExtArgs>>): Prisma.Prisma__ResellerHistoryClient<runtime.Types.Result.GetResult<Prisma.$ResellerHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ResellerHistory.
     * @param {ResellerHistoryUpdateArgs} args - Arguments to update one ResellerHistory.
     * @example
     * // Update one ResellerHistory
     * const resellerHistory = await prisma.resellerHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ResellerHistoryUpdateArgs>(args: Prisma.SelectSubset<T, ResellerHistoryUpdateArgs<ExtArgs>>): Prisma.Prisma__ResellerHistoryClient<runtime.Types.Result.GetResult<Prisma.$ResellerHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ResellerHistories.
     * @param {ResellerHistoryDeleteManyArgs} args - Arguments to filter ResellerHistories to delete.
     * @example
     * // Delete a few ResellerHistories
     * const { count } = await prisma.resellerHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ResellerHistoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, ResellerHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ResellerHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResellerHistories
     * const resellerHistory = await prisma.resellerHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ResellerHistoryUpdateManyArgs>(args: Prisma.SelectSubset<T, ResellerHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one ResellerHistory.
     * @param {ResellerHistoryUpsertArgs} args - Arguments to update or create a ResellerHistory.
     * @example
     * // Update or create a ResellerHistory
     * const resellerHistory = await prisma.resellerHistory.upsert({
     *   create: {
     *     // ... data to create a ResellerHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResellerHistory we want to update
     *   }
     * })
     */
    upsert<T extends ResellerHistoryUpsertArgs>(args: Prisma.SelectSubset<T, ResellerHistoryUpsertArgs<ExtArgs>>): Prisma.Prisma__ResellerHistoryClient<runtime.Types.Result.GetResult<Prisma.$ResellerHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ResellerHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerHistoryCountArgs} args - Arguments to filter ResellerHistories to count.
     * @example
     * // Count the number of ResellerHistories
     * const count = await prisma.resellerHistory.count({
     *   where: {
     *     // ... the filter for the ResellerHistories we want to count
     *   }
     * })
    **/
    count<T extends ResellerHistoryCountArgs>(args?: Prisma.Subset<T, ResellerHistoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ResellerHistoryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ResellerHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResellerHistoryAggregateArgs>(args: Prisma.Subset<T, ResellerHistoryAggregateArgs>): Prisma.PrismaPromise<GetResellerHistoryAggregateType<T>>;
    /**
     * Group by ResellerHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResellerHistoryGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ResellerHistoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ResellerHistoryGroupByArgs['orderBy'];
    } : {
        orderBy?: ResellerHistoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ResellerHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResellerHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ResellerHistory model
     */
    readonly fields: ResellerHistoryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ResellerHistory.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ResellerHistoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    reseller<T extends Prisma.ResellerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ResellerDefaultArgs<ExtArgs>>): Prisma.Prisma__ResellerClient<runtime.Types.Result.GetResult<Prisma.$ResellerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ResellerHistory model
 */
export interface ResellerHistoryFieldRefs {
    readonly id: Prisma.FieldRef<"ResellerHistory", 'String'>;
    readonly resellerId: Prisma.FieldRef<"ResellerHistory", 'String'>;
    readonly type: Prisma.FieldRef<"ResellerHistory", 'String'>;
    readonly description: Prisma.FieldRef<"ResellerHistory", 'String'>;
    readonly actor: Prisma.FieldRef<"ResellerHistory", 'String'>;
    readonly metadata: Prisma.FieldRef<"ResellerHistory", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ResellerHistory", 'DateTime'>;
}
/**
 * ResellerHistory findUnique
 */
export type ResellerHistoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResellerHistory
     */
    select?: Prisma.ResellerHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResellerHistory
     */
    omit?: Prisma.ResellerHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResellerHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which ResellerHistory to fetch.
     */
    where: Prisma.ResellerHistoryWhereUniqueInput;
};
/**
 * ResellerHistory findUniqueOrThrow
 */
export type ResellerHistoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResellerHistory
     */
    select?: Prisma.ResellerHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResellerHistory
     */
    omit?: Prisma.ResellerHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResellerHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which ResellerHistory to fetch.
     */
    where: Prisma.ResellerHistoryWhereUniqueInput;
};
/**
 * ResellerHistory findFirst
 */
export type ResellerHistoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResellerHistory
     */
    select?: Prisma.ResellerHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResellerHistory
     */
    omit?: Prisma.ResellerHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResellerHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which ResellerHistory to fetch.
     */
    where?: Prisma.ResellerHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResellerHistories to fetch.
     */
    orderBy?: Prisma.ResellerHistoryOrderByWithRelationInput | Prisma.ResellerHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ResellerHistories.
     */
    cursor?: Prisma.ResellerHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResellerHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResellerHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResellerHistories.
     */
    distinct?: Prisma.ResellerHistoryScalarFieldEnum | Prisma.ResellerHistoryScalarFieldEnum[];
};
/**
 * ResellerHistory findFirstOrThrow
 */
export type ResellerHistoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResellerHistory
     */
    select?: Prisma.ResellerHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResellerHistory
     */
    omit?: Prisma.ResellerHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResellerHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which ResellerHistory to fetch.
     */
    where?: Prisma.ResellerHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResellerHistories to fetch.
     */
    orderBy?: Prisma.ResellerHistoryOrderByWithRelationInput | Prisma.ResellerHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ResellerHistories.
     */
    cursor?: Prisma.ResellerHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResellerHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResellerHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResellerHistories.
     */
    distinct?: Prisma.ResellerHistoryScalarFieldEnum | Prisma.ResellerHistoryScalarFieldEnum[];
};
/**
 * ResellerHistory findMany
 */
export type ResellerHistoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResellerHistory
     */
    select?: Prisma.ResellerHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResellerHistory
     */
    omit?: Prisma.ResellerHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResellerHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which ResellerHistories to fetch.
     */
    where?: Prisma.ResellerHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResellerHistories to fetch.
     */
    orderBy?: Prisma.ResellerHistoryOrderByWithRelationInput | Prisma.ResellerHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ResellerHistories.
     */
    cursor?: Prisma.ResellerHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResellerHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResellerHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResellerHistories.
     */
    distinct?: Prisma.ResellerHistoryScalarFieldEnum | Prisma.ResellerHistoryScalarFieldEnum[];
};
/**
 * ResellerHistory create
 */
export type ResellerHistoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResellerHistory
     */
    select?: Prisma.ResellerHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResellerHistory
     */
    omit?: Prisma.ResellerHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResellerHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a ResellerHistory.
     */
    data: Prisma.XOR<Prisma.ResellerHistoryCreateInput, Prisma.ResellerHistoryUncheckedCreateInput>;
};
/**
 * ResellerHistory createMany
 */
export type ResellerHistoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResellerHistories.
     */
    data: Prisma.ResellerHistoryCreateManyInput | Prisma.ResellerHistoryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ResellerHistory update
 */
export type ResellerHistoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResellerHistory
     */
    select?: Prisma.ResellerHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResellerHistory
     */
    omit?: Prisma.ResellerHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResellerHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a ResellerHistory.
     */
    data: Prisma.XOR<Prisma.ResellerHistoryUpdateInput, Prisma.ResellerHistoryUncheckedUpdateInput>;
    /**
     * Choose, which ResellerHistory to update.
     */
    where: Prisma.ResellerHistoryWhereUniqueInput;
};
/**
 * ResellerHistory updateMany
 */
export type ResellerHistoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ResellerHistories.
     */
    data: Prisma.XOR<Prisma.ResellerHistoryUpdateManyMutationInput, Prisma.ResellerHistoryUncheckedUpdateManyInput>;
    /**
     * Filter which ResellerHistories to update
     */
    where?: Prisma.ResellerHistoryWhereInput;
    /**
     * Limit how many ResellerHistories to update.
     */
    limit?: number;
};
/**
 * ResellerHistory upsert
 */
export type ResellerHistoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResellerHistory
     */
    select?: Prisma.ResellerHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResellerHistory
     */
    omit?: Prisma.ResellerHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResellerHistoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the ResellerHistory to update in case it exists.
     */
    where: Prisma.ResellerHistoryWhereUniqueInput;
    /**
     * In case the ResellerHistory found by the `where` argument doesn't exist, create a new ResellerHistory with this data.
     */
    create: Prisma.XOR<Prisma.ResellerHistoryCreateInput, Prisma.ResellerHistoryUncheckedCreateInput>;
    /**
     * In case the ResellerHistory was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ResellerHistoryUpdateInput, Prisma.ResellerHistoryUncheckedUpdateInput>;
};
/**
 * ResellerHistory delete
 */
export type ResellerHistoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResellerHistory
     */
    select?: Prisma.ResellerHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResellerHistory
     */
    omit?: Prisma.ResellerHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResellerHistoryInclude<ExtArgs> | null;
    /**
     * Filter which ResellerHistory to delete.
     */
    where: Prisma.ResellerHistoryWhereUniqueInput;
};
/**
 * ResellerHistory deleteMany
 */
export type ResellerHistoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ResellerHistories to delete
     */
    where?: Prisma.ResellerHistoryWhereInput;
    /**
     * Limit how many ResellerHistories to delete.
     */
    limit?: number;
};
/**
 * ResellerHistory without action
 */
export type ResellerHistoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResellerHistory
     */
    select?: Prisma.ResellerHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResellerHistory
     */
    omit?: Prisma.ResellerHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResellerHistoryInclude<ExtArgs> | null;
};
