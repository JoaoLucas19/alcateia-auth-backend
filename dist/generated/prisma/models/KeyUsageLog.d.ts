import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model KeyUsageLog
 *
 */
export type KeyUsageLogModel = runtime.Types.Result.DefaultSelection<Prisma.$KeyUsageLogPayload>;
export type AggregateKeyUsageLog = {
    _count: KeyUsageLogCountAggregateOutputType | null;
    _min: KeyUsageLogMinAggregateOutputType | null;
    _max: KeyUsageLogMaxAggregateOutputType | null;
};
export type KeyUsageLogMinAggregateOutputType = {
    id: string | null;
    keyId: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    result: $Enums.ValidationResult | null;
    attemptedAt: Date | null;
};
export type KeyUsageLogMaxAggregateOutputType = {
    id: string | null;
    keyId: string | null;
    ipAddress: string | null;
    userAgent: string | null;
    result: $Enums.ValidationResult | null;
    attemptedAt: Date | null;
};
export type KeyUsageLogCountAggregateOutputType = {
    id: number;
    keyId: number;
    ipAddress: number;
    userAgent: number;
    result: number;
    attemptedAt: number;
    _all: number;
};
export type KeyUsageLogMinAggregateInputType = {
    id?: true;
    keyId?: true;
    ipAddress?: true;
    userAgent?: true;
    result?: true;
    attemptedAt?: true;
};
export type KeyUsageLogMaxAggregateInputType = {
    id?: true;
    keyId?: true;
    ipAddress?: true;
    userAgent?: true;
    result?: true;
    attemptedAt?: true;
};
export type KeyUsageLogCountAggregateInputType = {
    id?: true;
    keyId?: true;
    ipAddress?: true;
    userAgent?: true;
    result?: true;
    attemptedAt?: true;
    _all?: true;
};
export type KeyUsageLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which KeyUsageLog to aggregate.
     */
    where?: Prisma.KeyUsageLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KeyUsageLogs to fetch.
     */
    orderBy?: Prisma.KeyUsageLogOrderByWithRelationInput | Prisma.KeyUsageLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.KeyUsageLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KeyUsageLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KeyUsageLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned KeyUsageLogs
    **/
    _count?: true | KeyUsageLogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: KeyUsageLogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: KeyUsageLogMaxAggregateInputType;
};
export type GetKeyUsageLogAggregateType<T extends KeyUsageLogAggregateArgs> = {
    [P in keyof T & keyof AggregateKeyUsageLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKeyUsageLog[P]> : Prisma.GetScalarType<T[P], AggregateKeyUsageLog[P]>;
};
export type KeyUsageLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KeyUsageLogWhereInput;
    orderBy?: Prisma.KeyUsageLogOrderByWithAggregationInput | Prisma.KeyUsageLogOrderByWithAggregationInput[];
    by: Prisma.KeyUsageLogScalarFieldEnum[] | Prisma.KeyUsageLogScalarFieldEnum;
    having?: Prisma.KeyUsageLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: KeyUsageLogCountAggregateInputType | true;
    _min?: KeyUsageLogMinAggregateInputType;
    _max?: KeyUsageLogMaxAggregateInputType;
};
export type KeyUsageLogGroupByOutputType = {
    id: string;
    keyId: string;
    ipAddress: string;
    userAgent: string | null;
    result: $Enums.ValidationResult;
    attemptedAt: Date;
    _count: KeyUsageLogCountAggregateOutputType | null;
    _min: KeyUsageLogMinAggregateOutputType | null;
    _max: KeyUsageLogMaxAggregateOutputType | null;
};
export type GetKeyUsageLogGroupByPayload<T extends KeyUsageLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<KeyUsageLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof KeyUsageLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], KeyUsageLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], KeyUsageLogGroupByOutputType[P]>;
}>>;
export type KeyUsageLogWhereInput = {
    AND?: Prisma.KeyUsageLogWhereInput | Prisma.KeyUsageLogWhereInput[];
    OR?: Prisma.KeyUsageLogWhereInput[];
    NOT?: Prisma.KeyUsageLogWhereInput | Prisma.KeyUsageLogWhereInput[];
    id?: Prisma.StringFilter<"KeyUsageLog"> | string;
    keyId?: Prisma.StringFilter<"KeyUsageLog"> | string;
    ipAddress?: Prisma.StringFilter<"KeyUsageLog"> | string;
    userAgent?: Prisma.StringNullableFilter<"KeyUsageLog"> | string | null;
    result?: Prisma.EnumValidationResultFilter<"KeyUsageLog"> | $Enums.ValidationResult;
    attemptedAt?: Prisma.DateTimeFilter<"KeyUsageLog"> | Date | string;
    key?: Prisma.XOR<Prisma.KeyScalarRelationFilter, Prisma.KeyWhereInput>;
};
export type KeyUsageLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    keyId?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    result?: Prisma.SortOrder;
    attemptedAt?: Prisma.SortOrder;
    key?: Prisma.KeyOrderByWithRelationInput;
    _relevance?: Prisma.KeyUsageLogOrderByRelevanceInput;
};
export type KeyUsageLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.KeyUsageLogWhereInput | Prisma.KeyUsageLogWhereInput[];
    OR?: Prisma.KeyUsageLogWhereInput[];
    NOT?: Prisma.KeyUsageLogWhereInput | Prisma.KeyUsageLogWhereInput[];
    keyId?: Prisma.StringFilter<"KeyUsageLog"> | string;
    ipAddress?: Prisma.StringFilter<"KeyUsageLog"> | string;
    userAgent?: Prisma.StringNullableFilter<"KeyUsageLog"> | string | null;
    result?: Prisma.EnumValidationResultFilter<"KeyUsageLog"> | $Enums.ValidationResult;
    attemptedAt?: Prisma.DateTimeFilter<"KeyUsageLog"> | Date | string;
    key?: Prisma.XOR<Prisma.KeyScalarRelationFilter, Prisma.KeyWhereInput>;
}, "id">;
export type KeyUsageLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    keyId?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrderInput | Prisma.SortOrder;
    result?: Prisma.SortOrder;
    attemptedAt?: Prisma.SortOrder;
    _count?: Prisma.KeyUsageLogCountOrderByAggregateInput;
    _max?: Prisma.KeyUsageLogMaxOrderByAggregateInput;
    _min?: Prisma.KeyUsageLogMinOrderByAggregateInput;
};
export type KeyUsageLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.KeyUsageLogScalarWhereWithAggregatesInput | Prisma.KeyUsageLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.KeyUsageLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.KeyUsageLogScalarWhereWithAggregatesInput | Prisma.KeyUsageLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"KeyUsageLog"> | string;
    keyId?: Prisma.StringWithAggregatesFilter<"KeyUsageLog"> | string;
    ipAddress?: Prisma.StringWithAggregatesFilter<"KeyUsageLog"> | string;
    userAgent?: Prisma.StringNullableWithAggregatesFilter<"KeyUsageLog"> | string | null;
    result?: Prisma.EnumValidationResultWithAggregatesFilter<"KeyUsageLog"> | $Enums.ValidationResult;
    attemptedAt?: Prisma.DateTimeWithAggregatesFilter<"KeyUsageLog"> | Date | string;
};
export type KeyUsageLogCreateInput = {
    id?: string;
    ipAddress: string;
    userAgent?: string | null;
    result: $Enums.ValidationResult;
    attemptedAt?: Date | string;
    key: Prisma.KeyCreateNestedOneWithoutUsageLogsInput;
};
export type KeyUsageLogUncheckedCreateInput = {
    id?: string;
    keyId: string;
    ipAddress: string;
    userAgent?: string | null;
    result: $Enums.ValidationResult;
    attemptedAt?: Date | string;
};
export type KeyUsageLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    result?: Prisma.EnumValidationResultFieldUpdateOperationsInput | $Enums.ValidationResult;
    attemptedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    key?: Prisma.KeyUpdateOneRequiredWithoutUsageLogsNestedInput;
};
export type KeyUsageLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    keyId?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    result?: Prisma.EnumValidationResultFieldUpdateOperationsInput | $Enums.ValidationResult;
    attemptedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeyUsageLogCreateManyInput = {
    id?: string;
    keyId: string;
    ipAddress: string;
    userAgent?: string | null;
    result: $Enums.ValidationResult;
    attemptedAt?: Date | string;
};
export type KeyUsageLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    result?: Prisma.EnumValidationResultFieldUpdateOperationsInput | $Enums.ValidationResult;
    attemptedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeyUsageLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    keyId?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    result?: Prisma.EnumValidationResultFieldUpdateOperationsInput | $Enums.ValidationResult;
    attemptedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeyUsageLogListRelationFilter = {
    every?: Prisma.KeyUsageLogWhereInput;
    some?: Prisma.KeyUsageLogWhereInput;
    none?: Prisma.KeyUsageLogWhereInput;
};
export type KeyUsageLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type KeyUsageLogOrderByRelevanceInput = {
    fields: Prisma.KeyUsageLogOrderByRelevanceFieldEnum | Prisma.KeyUsageLogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type KeyUsageLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    keyId?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    attemptedAt?: Prisma.SortOrder;
};
export type KeyUsageLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    keyId?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    attemptedAt?: Prisma.SortOrder;
};
export type KeyUsageLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    keyId?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userAgent?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    attemptedAt?: Prisma.SortOrder;
};
export type KeyUsageLogCreateNestedManyWithoutKeyInput = {
    create?: Prisma.XOR<Prisma.KeyUsageLogCreateWithoutKeyInput, Prisma.KeyUsageLogUncheckedCreateWithoutKeyInput> | Prisma.KeyUsageLogCreateWithoutKeyInput[] | Prisma.KeyUsageLogUncheckedCreateWithoutKeyInput[];
    connectOrCreate?: Prisma.KeyUsageLogCreateOrConnectWithoutKeyInput | Prisma.KeyUsageLogCreateOrConnectWithoutKeyInput[];
    createMany?: Prisma.KeyUsageLogCreateManyKeyInputEnvelope;
    connect?: Prisma.KeyUsageLogWhereUniqueInput | Prisma.KeyUsageLogWhereUniqueInput[];
};
export type KeyUsageLogUncheckedCreateNestedManyWithoutKeyInput = {
    create?: Prisma.XOR<Prisma.KeyUsageLogCreateWithoutKeyInput, Prisma.KeyUsageLogUncheckedCreateWithoutKeyInput> | Prisma.KeyUsageLogCreateWithoutKeyInput[] | Prisma.KeyUsageLogUncheckedCreateWithoutKeyInput[];
    connectOrCreate?: Prisma.KeyUsageLogCreateOrConnectWithoutKeyInput | Prisma.KeyUsageLogCreateOrConnectWithoutKeyInput[];
    createMany?: Prisma.KeyUsageLogCreateManyKeyInputEnvelope;
    connect?: Prisma.KeyUsageLogWhereUniqueInput | Prisma.KeyUsageLogWhereUniqueInput[];
};
export type KeyUsageLogUpdateManyWithoutKeyNestedInput = {
    create?: Prisma.XOR<Prisma.KeyUsageLogCreateWithoutKeyInput, Prisma.KeyUsageLogUncheckedCreateWithoutKeyInput> | Prisma.KeyUsageLogCreateWithoutKeyInput[] | Prisma.KeyUsageLogUncheckedCreateWithoutKeyInput[];
    connectOrCreate?: Prisma.KeyUsageLogCreateOrConnectWithoutKeyInput | Prisma.KeyUsageLogCreateOrConnectWithoutKeyInput[];
    upsert?: Prisma.KeyUsageLogUpsertWithWhereUniqueWithoutKeyInput | Prisma.KeyUsageLogUpsertWithWhereUniqueWithoutKeyInput[];
    createMany?: Prisma.KeyUsageLogCreateManyKeyInputEnvelope;
    set?: Prisma.KeyUsageLogWhereUniqueInput | Prisma.KeyUsageLogWhereUniqueInput[];
    disconnect?: Prisma.KeyUsageLogWhereUniqueInput | Prisma.KeyUsageLogWhereUniqueInput[];
    delete?: Prisma.KeyUsageLogWhereUniqueInput | Prisma.KeyUsageLogWhereUniqueInput[];
    connect?: Prisma.KeyUsageLogWhereUniqueInput | Prisma.KeyUsageLogWhereUniqueInput[];
    update?: Prisma.KeyUsageLogUpdateWithWhereUniqueWithoutKeyInput | Prisma.KeyUsageLogUpdateWithWhereUniqueWithoutKeyInput[];
    updateMany?: Prisma.KeyUsageLogUpdateManyWithWhereWithoutKeyInput | Prisma.KeyUsageLogUpdateManyWithWhereWithoutKeyInput[];
    deleteMany?: Prisma.KeyUsageLogScalarWhereInput | Prisma.KeyUsageLogScalarWhereInput[];
};
export type KeyUsageLogUncheckedUpdateManyWithoutKeyNestedInput = {
    create?: Prisma.XOR<Prisma.KeyUsageLogCreateWithoutKeyInput, Prisma.KeyUsageLogUncheckedCreateWithoutKeyInput> | Prisma.KeyUsageLogCreateWithoutKeyInput[] | Prisma.KeyUsageLogUncheckedCreateWithoutKeyInput[];
    connectOrCreate?: Prisma.KeyUsageLogCreateOrConnectWithoutKeyInput | Prisma.KeyUsageLogCreateOrConnectWithoutKeyInput[];
    upsert?: Prisma.KeyUsageLogUpsertWithWhereUniqueWithoutKeyInput | Prisma.KeyUsageLogUpsertWithWhereUniqueWithoutKeyInput[];
    createMany?: Prisma.KeyUsageLogCreateManyKeyInputEnvelope;
    set?: Prisma.KeyUsageLogWhereUniqueInput | Prisma.KeyUsageLogWhereUniqueInput[];
    disconnect?: Prisma.KeyUsageLogWhereUniqueInput | Prisma.KeyUsageLogWhereUniqueInput[];
    delete?: Prisma.KeyUsageLogWhereUniqueInput | Prisma.KeyUsageLogWhereUniqueInput[];
    connect?: Prisma.KeyUsageLogWhereUniqueInput | Prisma.KeyUsageLogWhereUniqueInput[];
    update?: Prisma.KeyUsageLogUpdateWithWhereUniqueWithoutKeyInput | Prisma.KeyUsageLogUpdateWithWhereUniqueWithoutKeyInput[];
    updateMany?: Prisma.KeyUsageLogUpdateManyWithWhereWithoutKeyInput | Prisma.KeyUsageLogUpdateManyWithWhereWithoutKeyInput[];
    deleteMany?: Prisma.KeyUsageLogScalarWhereInput | Prisma.KeyUsageLogScalarWhereInput[];
};
export type EnumValidationResultFieldUpdateOperationsInput = {
    set?: $Enums.ValidationResult;
};
export type KeyUsageLogCreateWithoutKeyInput = {
    id?: string;
    ipAddress: string;
    userAgent?: string | null;
    result: $Enums.ValidationResult;
    attemptedAt?: Date | string;
};
export type KeyUsageLogUncheckedCreateWithoutKeyInput = {
    id?: string;
    ipAddress: string;
    userAgent?: string | null;
    result: $Enums.ValidationResult;
    attemptedAt?: Date | string;
};
export type KeyUsageLogCreateOrConnectWithoutKeyInput = {
    where: Prisma.KeyUsageLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.KeyUsageLogCreateWithoutKeyInput, Prisma.KeyUsageLogUncheckedCreateWithoutKeyInput>;
};
export type KeyUsageLogCreateManyKeyInputEnvelope = {
    data: Prisma.KeyUsageLogCreateManyKeyInput | Prisma.KeyUsageLogCreateManyKeyInput[];
    skipDuplicates?: boolean;
};
export type KeyUsageLogUpsertWithWhereUniqueWithoutKeyInput = {
    where: Prisma.KeyUsageLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.KeyUsageLogUpdateWithoutKeyInput, Prisma.KeyUsageLogUncheckedUpdateWithoutKeyInput>;
    create: Prisma.XOR<Prisma.KeyUsageLogCreateWithoutKeyInput, Prisma.KeyUsageLogUncheckedCreateWithoutKeyInput>;
};
export type KeyUsageLogUpdateWithWhereUniqueWithoutKeyInput = {
    where: Prisma.KeyUsageLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.KeyUsageLogUpdateWithoutKeyInput, Prisma.KeyUsageLogUncheckedUpdateWithoutKeyInput>;
};
export type KeyUsageLogUpdateManyWithWhereWithoutKeyInput = {
    where: Prisma.KeyUsageLogScalarWhereInput;
    data: Prisma.XOR<Prisma.KeyUsageLogUpdateManyMutationInput, Prisma.KeyUsageLogUncheckedUpdateManyWithoutKeyInput>;
};
export type KeyUsageLogScalarWhereInput = {
    AND?: Prisma.KeyUsageLogScalarWhereInput | Prisma.KeyUsageLogScalarWhereInput[];
    OR?: Prisma.KeyUsageLogScalarWhereInput[];
    NOT?: Prisma.KeyUsageLogScalarWhereInput | Prisma.KeyUsageLogScalarWhereInput[];
    id?: Prisma.StringFilter<"KeyUsageLog"> | string;
    keyId?: Prisma.StringFilter<"KeyUsageLog"> | string;
    ipAddress?: Prisma.StringFilter<"KeyUsageLog"> | string;
    userAgent?: Prisma.StringNullableFilter<"KeyUsageLog"> | string | null;
    result?: Prisma.EnumValidationResultFilter<"KeyUsageLog"> | $Enums.ValidationResult;
    attemptedAt?: Prisma.DateTimeFilter<"KeyUsageLog"> | Date | string;
};
export type KeyUsageLogCreateManyKeyInput = {
    id?: string;
    ipAddress: string;
    userAgent?: string | null;
    result: $Enums.ValidationResult;
    attemptedAt?: Date | string;
};
export type KeyUsageLogUpdateWithoutKeyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    result?: Prisma.EnumValidationResultFieldUpdateOperationsInput | $Enums.ValidationResult;
    attemptedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeyUsageLogUncheckedUpdateWithoutKeyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    result?: Prisma.EnumValidationResultFieldUpdateOperationsInput | $Enums.ValidationResult;
    attemptedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeyUsageLogUncheckedUpdateManyWithoutKeyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    userAgent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    result?: Prisma.EnumValidationResultFieldUpdateOperationsInput | $Enums.ValidationResult;
    attemptedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeyUsageLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    keyId?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    result?: boolean;
    attemptedAt?: boolean;
    key?: boolean | Prisma.KeyDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["keyUsageLog"]>;
export type KeyUsageLogSelectScalar = {
    id?: boolean;
    keyId?: boolean;
    ipAddress?: boolean;
    userAgent?: boolean;
    result?: boolean;
    attemptedAt?: boolean;
};
export type KeyUsageLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "keyId" | "ipAddress" | "userAgent" | "result" | "attemptedAt", ExtArgs["result"]["keyUsageLog"]>;
export type KeyUsageLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    key?: boolean | Prisma.KeyDefaultArgs<ExtArgs>;
};
export type $KeyUsageLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "KeyUsageLog";
    objects: {
        key: Prisma.$KeyPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        keyId: string;
        ipAddress: string;
        userAgent: string | null;
        result: $Enums.ValidationResult;
        attemptedAt: Date;
    }, ExtArgs["result"]["keyUsageLog"]>;
    composites: {};
};
export type KeyUsageLogGetPayload<S extends boolean | null | undefined | KeyUsageLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KeyUsageLogPayload, S>;
export type KeyUsageLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<KeyUsageLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: KeyUsageLogCountAggregateInputType | true;
};
export interface KeyUsageLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['KeyUsageLog'];
        meta: {
            name: 'KeyUsageLog';
        };
    };
    /**
     * Find zero or one KeyUsageLog that matches the filter.
     * @param {KeyUsageLogFindUniqueArgs} args - Arguments to find a KeyUsageLog
     * @example
     * // Get one KeyUsageLog
     * const keyUsageLog = await prisma.keyUsageLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KeyUsageLogFindUniqueArgs>(args: Prisma.SelectSubset<T, KeyUsageLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__KeyUsageLogClient<runtime.Types.Result.GetResult<Prisma.$KeyUsageLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one KeyUsageLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KeyUsageLogFindUniqueOrThrowArgs} args - Arguments to find a KeyUsageLog
     * @example
     * // Get one KeyUsageLog
     * const keyUsageLog = await prisma.keyUsageLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KeyUsageLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, KeyUsageLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__KeyUsageLogClient<runtime.Types.Result.GetResult<Prisma.$KeyUsageLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first KeyUsageLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyUsageLogFindFirstArgs} args - Arguments to find a KeyUsageLog
     * @example
     * // Get one KeyUsageLog
     * const keyUsageLog = await prisma.keyUsageLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KeyUsageLogFindFirstArgs>(args?: Prisma.SelectSubset<T, KeyUsageLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__KeyUsageLogClient<runtime.Types.Result.GetResult<Prisma.$KeyUsageLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first KeyUsageLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyUsageLogFindFirstOrThrowArgs} args - Arguments to find a KeyUsageLog
     * @example
     * // Get one KeyUsageLog
     * const keyUsageLog = await prisma.keyUsageLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KeyUsageLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, KeyUsageLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__KeyUsageLogClient<runtime.Types.Result.GetResult<Prisma.$KeyUsageLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more KeyUsageLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyUsageLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KeyUsageLogs
     * const keyUsageLogs = await prisma.keyUsageLog.findMany()
     *
     * // Get first 10 KeyUsageLogs
     * const keyUsageLogs = await prisma.keyUsageLog.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const keyUsageLogWithIdOnly = await prisma.keyUsageLog.findMany({ select: { id: true } })
     *
     */
    findMany<T extends KeyUsageLogFindManyArgs>(args?: Prisma.SelectSubset<T, KeyUsageLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KeyUsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a KeyUsageLog.
     * @param {KeyUsageLogCreateArgs} args - Arguments to create a KeyUsageLog.
     * @example
     * // Create one KeyUsageLog
     * const KeyUsageLog = await prisma.keyUsageLog.create({
     *   data: {
     *     // ... data to create a KeyUsageLog
     *   }
     * })
     *
     */
    create<T extends KeyUsageLogCreateArgs>(args: Prisma.SelectSubset<T, KeyUsageLogCreateArgs<ExtArgs>>): Prisma.Prisma__KeyUsageLogClient<runtime.Types.Result.GetResult<Prisma.$KeyUsageLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many KeyUsageLogs.
     * @param {KeyUsageLogCreateManyArgs} args - Arguments to create many KeyUsageLogs.
     * @example
     * // Create many KeyUsageLogs
     * const keyUsageLog = await prisma.keyUsageLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends KeyUsageLogCreateManyArgs>(args?: Prisma.SelectSubset<T, KeyUsageLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a KeyUsageLog.
     * @param {KeyUsageLogDeleteArgs} args - Arguments to delete one KeyUsageLog.
     * @example
     * // Delete one KeyUsageLog
     * const KeyUsageLog = await prisma.keyUsageLog.delete({
     *   where: {
     *     // ... filter to delete one KeyUsageLog
     *   }
     * })
     *
     */
    delete<T extends KeyUsageLogDeleteArgs>(args: Prisma.SelectSubset<T, KeyUsageLogDeleteArgs<ExtArgs>>): Prisma.Prisma__KeyUsageLogClient<runtime.Types.Result.GetResult<Prisma.$KeyUsageLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one KeyUsageLog.
     * @param {KeyUsageLogUpdateArgs} args - Arguments to update one KeyUsageLog.
     * @example
     * // Update one KeyUsageLog
     * const keyUsageLog = await prisma.keyUsageLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends KeyUsageLogUpdateArgs>(args: Prisma.SelectSubset<T, KeyUsageLogUpdateArgs<ExtArgs>>): Prisma.Prisma__KeyUsageLogClient<runtime.Types.Result.GetResult<Prisma.$KeyUsageLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more KeyUsageLogs.
     * @param {KeyUsageLogDeleteManyArgs} args - Arguments to filter KeyUsageLogs to delete.
     * @example
     * // Delete a few KeyUsageLogs
     * const { count } = await prisma.keyUsageLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends KeyUsageLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, KeyUsageLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more KeyUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyUsageLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KeyUsageLogs
     * const keyUsageLog = await prisma.keyUsageLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends KeyUsageLogUpdateManyArgs>(args: Prisma.SelectSubset<T, KeyUsageLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one KeyUsageLog.
     * @param {KeyUsageLogUpsertArgs} args - Arguments to update or create a KeyUsageLog.
     * @example
     * // Update or create a KeyUsageLog
     * const keyUsageLog = await prisma.keyUsageLog.upsert({
     *   create: {
     *     // ... data to create a KeyUsageLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KeyUsageLog we want to update
     *   }
     * })
     */
    upsert<T extends KeyUsageLogUpsertArgs>(args: Prisma.SelectSubset<T, KeyUsageLogUpsertArgs<ExtArgs>>): Prisma.Prisma__KeyUsageLogClient<runtime.Types.Result.GetResult<Prisma.$KeyUsageLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of KeyUsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyUsageLogCountArgs} args - Arguments to filter KeyUsageLogs to count.
     * @example
     * // Count the number of KeyUsageLogs
     * const count = await prisma.keyUsageLog.count({
     *   where: {
     *     // ... the filter for the KeyUsageLogs we want to count
     *   }
     * })
    **/
    count<T extends KeyUsageLogCountArgs>(args?: Prisma.Subset<T, KeyUsageLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], KeyUsageLogCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a KeyUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyUsageLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KeyUsageLogAggregateArgs>(args: Prisma.Subset<T, KeyUsageLogAggregateArgs>): Prisma.PrismaPromise<GetKeyUsageLogAggregateType<T>>;
    /**
     * Group by KeyUsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyUsageLogGroupByArgs} args - Group by arguments.
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
    groupBy<T extends KeyUsageLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: KeyUsageLogGroupByArgs['orderBy'];
    } : {
        orderBy?: KeyUsageLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, KeyUsageLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKeyUsageLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the KeyUsageLog model
     */
    readonly fields: KeyUsageLogFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for KeyUsageLog.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__KeyUsageLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    key<T extends Prisma.KeyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.KeyDefaultArgs<ExtArgs>>): Prisma.Prisma__KeyClient<runtime.Types.Result.GetResult<Prisma.$KeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the KeyUsageLog model
 */
export interface KeyUsageLogFieldRefs {
    readonly id: Prisma.FieldRef<"KeyUsageLog", 'String'>;
    readonly keyId: Prisma.FieldRef<"KeyUsageLog", 'String'>;
    readonly ipAddress: Prisma.FieldRef<"KeyUsageLog", 'String'>;
    readonly userAgent: Prisma.FieldRef<"KeyUsageLog", 'String'>;
    readonly result: Prisma.FieldRef<"KeyUsageLog", 'ValidationResult'>;
    readonly attemptedAt: Prisma.FieldRef<"KeyUsageLog", 'DateTime'>;
}
/**
 * KeyUsageLog findUnique
 */
export type KeyUsageLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyUsageLog
     */
    select?: Prisma.KeyUsageLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeyUsageLog
     */
    omit?: Prisma.KeyUsageLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyUsageLogInclude<ExtArgs> | null;
    /**
     * Filter, which KeyUsageLog to fetch.
     */
    where: Prisma.KeyUsageLogWhereUniqueInput;
};
/**
 * KeyUsageLog findUniqueOrThrow
 */
export type KeyUsageLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyUsageLog
     */
    select?: Prisma.KeyUsageLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeyUsageLog
     */
    omit?: Prisma.KeyUsageLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyUsageLogInclude<ExtArgs> | null;
    /**
     * Filter, which KeyUsageLog to fetch.
     */
    where: Prisma.KeyUsageLogWhereUniqueInput;
};
/**
 * KeyUsageLog findFirst
 */
export type KeyUsageLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyUsageLog
     */
    select?: Prisma.KeyUsageLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeyUsageLog
     */
    omit?: Prisma.KeyUsageLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyUsageLogInclude<ExtArgs> | null;
    /**
     * Filter, which KeyUsageLog to fetch.
     */
    where?: Prisma.KeyUsageLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KeyUsageLogs to fetch.
     */
    orderBy?: Prisma.KeyUsageLogOrderByWithRelationInput | Prisma.KeyUsageLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for KeyUsageLogs.
     */
    cursor?: Prisma.KeyUsageLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KeyUsageLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KeyUsageLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of KeyUsageLogs.
     */
    distinct?: Prisma.KeyUsageLogScalarFieldEnum | Prisma.KeyUsageLogScalarFieldEnum[];
};
/**
 * KeyUsageLog findFirstOrThrow
 */
export type KeyUsageLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyUsageLog
     */
    select?: Prisma.KeyUsageLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeyUsageLog
     */
    omit?: Prisma.KeyUsageLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyUsageLogInclude<ExtArgs> | null;
    /**
     * Filter, which KeyUsageLog to fetch.
     */
    where?: Prisma.KeyUsageLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KeyUsageLogs to fetch.
     */
    orderBy?: Prisma.KeyUsageLogOrderByWithRelationInput | Prisma.KeyUsageLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for KeyUsageLogs.
     */
    cursor?: Prisma.KeyUsageLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KeyUsageLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KeyUsageLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of KeyUsageLogs.
     */
    distinct?: Prisma.KeyUsageLogScalarFieldEnum | Prisma.KeyUsageLogScalarFieldEnum[];
};
/**
 * KeyUsageLog findMany
 */
export type KeyUsageLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyUsageLog
     */
    select?: Prisma.KeyUsageLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeyUsageLog
     */
    omit?: Prisma.KeyUsageLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyUsageLogInclude<ExtArgs> | null;
    /**
     * Filter, which KeyUsageLogs to fetch.
     */
    where?: Prisma.KeyUsageLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of KeyUsageLogs to fetch.
     */
    orderBy?: Prisma.KeyUsageLogOrderByWithRelationInput | Prisma.KeyUsageLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing KeyUsageLogs.
     */
    cursor?: Prisma.KeyUsageLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` KeyUsageLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` KeyUsageLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of KeyUsageLogs.
     */
    distinct?: Prisma.KeyUsageLogScalarFieldEnum | Prisma.KeyUsageLogScalarFieldEnum[];
};
/**
 * KeyUsageLog create
 */
export type KeyUsageLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyUsageLog
     */
    select?: Prisma.KeyUsageLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeyUsageLog
     */
    omit?: Prisma.KeyUsageLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyUsageLogInclude<ExtArgs> | null;
    /**
     * The data needed to create a KeyUsageLog.
     */
    data: Prisma.XOR<Prisma.KeyUsageLogCreateInput, Prisma.KeyUsageLogUncheckedCreateInput>;
};
/**
 * KeyUsageLog createMany
 */
export type KeyUsageLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many KeyUsageLogs.
     */
    data: Prisma.KeyUsageLogCreateManyInput | Prisma.KeyUsageLogCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * KeyUsageLog update
 */
export type KeyUsageLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyUsageLog
     */
    select?: Prisma.KeyUsageLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeyUsageLog
     */
    omit?: Prisma.KeyUsageLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyUsageLogInclude<ExtArgs> | null;
    /**
     * The data needed to update a KeyUsageLog.
     */
    data: Prisma.XOR<Prisma.KeyUsageLogUpdateInput, Prisma.KeyUsageLogUncheckedUpdateInput>;
    /**
     * Choose, which KeyUsageLog to update.
     */
    where: Prisma.KeyUsageLogWhereUniqueInput;
};
/**
 * KeyUsageLog updateMany
 */
export type KeyUsageLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update KeyUsageLogs.
     */
    data: Prisma.XOR<Prisma.KeyUsageLogUpdateManyMutationInput, Prisma.KeyUsageLogUncheckedUpdateManyInput>;
    /**
     * Filter which KeyUsageLogs to update
     */
    where?: Prisma.KeyUsageLogWhereInput;
    /**
     * Limit how many KeyUsageLogs to update.
     */
    limit?: number;
};
/**
 * KeyUsageLog upsert
 */
export type KeyUsageLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyUsageLog
     */
    select?: Prisma.KeyUsageLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeyUsageLog
     */
    omit?: Prisma.KeyUsageLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyUsageLogInclude<ExtArgs> | null;
    /**
     * The filter to search for the KeyUsageLog to update in case it exists.
     */
    where: Prisma.KeyUsageLogWhereUniqueInput;
    /**
     * In case the KeyUsageLog found by the `where` argument doesn't exist, create a new KeyUsageLog with this data.
     */
    create: Prisma.XOR<Prisma.KeyUsageLogCreateInput, Prisma.KeyUsageLogUncheckedCreateInput>;
    /**
     * In case the KeyUsageLog was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.KeyUsageLogUpdateInput, Prisma.KeyUsageLogUncheckedUpdateInput>;
};
/**
 * KeyUsageLog delete
 */
export type KeyUsageLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyUsageLog
     */
    select?: Prisma.KeyUsageLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeyUsageLog
     */
    omit?: Prisma.KeyUsageLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyUsageLogInclude<ExtArgs> | null;
    /**
     * Filter which KeyUsageLog to delete.
     */
    where: Prisma.KeyUsageLogWhereUniqueInput;
};
/**
 * KeyUsageLog deleteMany
 */
export type KeyUsageLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which KeyUsageLogs to delete
     */
    where?: Prisma.KeyUsageLogWhereInput;
    /**
     * Limit how many KeyUsageLogs to delete.
     */
    limit?: number;
};
/**
 * KeyUsageLog without action
 */
export type KeyUsageLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyUsageLog
     */
    select?: Prisma.KeyUsageLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the KeyUsageLog
     */
    omit?: Prisma.KeyUsageLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyUsageLogInclude<ExtArgs> | null;
};
