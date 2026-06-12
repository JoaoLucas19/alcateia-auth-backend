import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Key
 *
 */
export type KeyModel = runtime.Types.Result.DefaultSelection<Prisma.$KeyPayload>;
export type AggregateKey = {
    _count: KeyCountAggregateOutputType | null;
    _min: KeyMinAggregateOutputType | null;
    _max: KeyMaxAggregateOutputType | null;
};
export type KeyMinAggregateOutputType = {
    id: string | null;
    value: string | null;
    productId: string | null;
    createdById: string | null;
    customerEmail: string | null;
    customerName: string | null;
    status: $Enums.KeyStatus | null;
    isPermanent: boolean | null;
    activatedAt: Date | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type KeyMaxAggregateOutputType = {
    id: string | null;
    value: string | null;
    productId: string | null;
    createdById: string | null;
    customerEmail: string | null;
    customerName: string | null;
    status: $Enums.KeyStatus | null;
    isPermanent: boolean | null;
    activatedAt: Date | null;
    expiresAt: Date | null;
    createdAt: Date | null;
};
export type KeyCountAggregateOutputType = {
    id: number;
    value: number;
    productId: number;
    createdById: number;
    customerEmail: number;
    customerName: number;
    status: number;
    isPermanent: number;
    activatedAt: number;
    expiresAt: number;
    createdAt: number;
    _all: number;
};
export type KeyMinAggregateInputType = {
    id?: true;
    value?: true;
    productId?: true;
    createdById?: true;
    customerEmail?: true;
    customerName?: true;
    status?: true;
    isPermanent?: true;
    activatedAt?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type KeyMaxAggregateInputType = {
    id?: true;
    value?: true;
    productId?: true;
    createdById?: true;
    customerEmail?: true;
    customerName?: true;
    status?: true;
    isPermanent?: true;
    activatedAt?: true;
    expiresAt?: true;
    createdAt?: true;
};
export type KeyCountAggregateInputType = {
    id?: true;
    value?: true;
    productId?: true;
    createdById?: true;
    customerEmail?: true;
    customerName?: true;
    status?: true;
    isPermanent?: true;
    activatedAt?: true;
    expiresAt?: true;
    createdAt?: true;
    _all?: true;
};
export type KeyAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Key to aggregate.
     */
    where?: Prisma.KeyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Keys to fetch.
     */
    orderBy?: Prisma.KeyOrderByWithRelationInput | Prisma.KeyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.KeyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Keys from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Keys.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Keys
    **/
    _count?: true | KeyCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: KeyMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: KeyMaxAggregateInputType;
};
export type GetKeyAggregateType<T extends KeyAggregateArgs> = {
    [P in keyof T & keyof AggregateKey]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKey[P]> : Prisma.GetScalarType<T[P], AggregateKey[P]>;
};
export type KeyGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KeyWhereInput;
    orderBy?: Prisma.KeyOrderByWithAggregationInput | Prisma.KeyOrderByWithAggregationInput[];
    by: Prisma.KeyScalarFieldEnum[] | Prisma.KeyScalarFieldEnum;
    having?: Prisma.KeyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: KeyCountAggregateInputType | true;
    _min?: KeyMinAggregateInputType;
    _max?: KeyMaxAggregateInputType;
};
export type KeyGroupByOutputType = {
    id: string;
    value: string;
    productId: string;
    createdById: string;
    customerEmail: string | null;
    customerName: string | null;
    status: $Enums.KeyStatus;
    isPermanent: boolean;
    activatedAt: Date | null;
    expiresAt: Date | null;
    createdAt: Date;
    _count: KeyCountAggregateOutputType | null;
    _min: KeyMinAggregateOutputType | null;
    _max: KeyMaxAggregateOutputType | null;
};
export type GetKeyGroupByPayload<T extends KeyGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<KeyGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof KeyGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], KeyGroupByOutputType[P]> : Prisma.GetScalarType<T[P], KeyGroupByOutputType[P]>;
}>>;
export type KeyWhereInput = {
    AND?: Prisma.KeyWhereInput | Prisma.KeyWhereInput[];
    OR?: Prisma.KeyWhereInput[];
    NOT?: Prisma.KeyWhereInput | Prisma.KeyWhereInput[];
    id?: Prisma.StringFilter<"Key"> | string;
    value?: Prisma.StringFilter<"Key"> | string;
    productId?: Prisma.StringFilter<"Key"> | string;
    createdById?: Prisma.StringFilter<"Key"> | string;
    customerEmail?: Prisma.StringNullableFilter<"Key"> | string | null;
    customerName?: Prisma.StringNullableFilter<"Key"> | string | null;
    status?: Prisma.EnumKeyStatusFilter<"Key"> | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFilter<"Key"> | boolean;
    activatedAt?: Prisma.DateTimeNullableFilter<"Key"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"Key"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Key"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    createdBy?: Prisma.XOR<Prisma.AdminScalarRelationFilter, Prisma.AdminWhereInput>;
    usageLogs?: Prisma.KeyUsageLogListRelationFilter;
    client?: Prisma.XOR<Prisma.ClientNullableScalarRelationFilter, Prisma.ClientWhereInput> | null;
};
export type KeyOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    customerEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    customerName?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isPermanent?: Prisma.SortOrder;
    activatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    createdBy?: Prisma.AdminOrderByWithRelationInput;
    usageLogs?: Prisma.KeyUsageLogOrderByRelationAggregateInput;
    client?: Prisma.ClientOrderByWithRelationInput;
    _relevance?: Prisma.KeyOrderByRelevanceInput;
};
export type KeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    value?: string;
    AND?: Prisma.KeyWhereInput | Prisma.KeyWhereInput[];
    OR?: Prisma.KeyWhereInput[];
    NOT?: Prisma.KeyWhereInput | Prisma.KeyWhereInput[];
    productId?: Prisma.StringFilter<"Key"> | string;
    createdById?: Prisma.StringFilter<"Key"> | string;
    customerEmail?: Prisma.StringNullableFilter<"Key"> | string | null;
    customerName?: Prisma.StringNullableFilter<"Key"> | string | null;
    status?: Prisma.EnumKeyStatusFilter<"Key"> | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFilter<"Key"> | boolean;
    activatedAt?: Prisma.DateTimeNullableFilter<"Key"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"Key"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Key"> | Date | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    createdBy?: Prisma.XOR<Prisma.AdminScalarRelationFilter, Prisma.AdminWhereInput>;
    usageLogs?: Prisma.KeyUsageLogListRelationFilter;
    client?: Prisma.XOR<Prisma.ClientNullableScalarRelationFilter, Prisma.ClientWhereInput> | null;
}, "id" | "value">;
export type KeyOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    customerEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    customerName?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isPermanent?: Prisma.SortOrder;
    activatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.KeyCountOrderByAggregateInput;
    _max?: Prisma.KeyMaxOrderByAggregateInput;
    _min?: Prisma.KeyMinOrderByAggregateInput;
};
export type KeyScalarWhereWithAggregatesInput = {
    AND?: Prisma.KeyScalarWhereWithAggregatesInput | Prisma.KeyScalarWhereWithAggregatesInput[];
    OR?: Prisma.KeyScalarWhereWithAggregatesInput[];
    NOT?: Prisma.KeyScalarWhereWithAggregatesInput | Prisma.KeyScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Key"> | string;
    value?: Prisma.StringWithAggregatesFilter<"Key"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"Key"> | string;
    createdById?: Prisma.StringWithAggregatesFilter<"Key"> | string;
    customerEmail?: Prisma.StringNullableWithAggregatesFilter<"Key"> | string | null;
    customerName?: Prisma.StringNullableWithAggregatesFilter<"Key"> | string | null;
    status?: Prisma.EnumKeyStatusWithAggregatesFilter<"Key"> | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolWithAggregatesFilter<"Key"> | boolean;
    activatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Key"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Key"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Key"> | Date | string;
};
export type KeyCreateInput = {
    id?: string;
    value: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutKeysInput;
    createdBy: Prisma.AdminCreateNestedOneWithoutKeysInput;
    usageLogs?: Prisma.KeyUsageLogCreateNestedManyWithoutKeyInput;
    client?: Prisma.ClientCreateNestedOneWithoutKeyInput;
};
export type KeyUncheckedCreateInput = {
    id?: string;
    value: string;
    productId: string;
    createdById: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    usageLogs?: Prisma.KeyUsageLogUncheckedCreateNestedManyWithoutKeyInput;
    client?: Prisma.ClientUncheckedCreateNestedOneWithoutKeyInput;
};
export type KeyUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutKeysNestedInput;
    createdBy?: Prisma.AdminUpdateOneRequiredWithoutKeysNestedInput;
    usageLogs?: Prisma.KeyUsageLogUpdateManyWithoutKeyNestedInput;
    client?: Prisma.ClientUpdateOneWithoutKeyNestedInput;
};
export type KeyUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usageLogs?: Prisma.KeyUsageLogUncheckedUpdateManyWithoutKeyNestedInput;
    client?: Prisma.ClientUncheckedUpdateOneWithoutKeyNestedInput;
};
export type KeyCreateManyInput = {
    id?: string;
    value: string;
    productId: string;
    createdById: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
};
export type KeyUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeyUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeyListRelationFilter = {
    every?: Prisma.KeyWhereInput;
    some?: Prisma.KeyWhereInput;
    none?: Prisma.KeyWhereInput;
};
export type KeyOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type KeyOrderByRelevanceInput = {
    fields: Prisma.KeyOrderByRelevanceFieldEnum | Prisma.KeyOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type KeyCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    customerEmail?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isPermanent?: Prisma.SortOrder;
    activatedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KeyMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    customerEmail?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isPermanent?: Prisma.SortOrder;
    activatedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KeyMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    customerEmail?: Prisma.SortOrder;
    customerName?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    isPermanent?: Prisma.SortOrder;
    activatedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KeyScalarRelationFilter = {
    is?: Prisma.KeyWhereInput;
    isNot?: Prisma.KeyWhereInput;
};
export type KeyCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutCreatedByInput, Prisma.KeyUncheckedCreateWithoutCreatedByInput> | Prisma.KeyCreateWithoutCreatedByInput[] | Prisma.KeyUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutCreatedByInput | Prisma.KeyCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.KeyCreateManyCreatedByInputEnvelope;
    connect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
};
export type KeyUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutCreatedByInput, Prisma.KeyUncheckedCreateWithoutCreatedByInput> | Prisma.KeyCreateWithoutCreatedByInput[] | Prisma.KeyUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutCreatedByInput | Prisma.KeyCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.KeyCreateManyCreatedByInputEnvelope;
    connect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
};
export type KeyUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutCreatedByInput, Prisma.KeyUncheckedCreateWithoutCreatedByInput> | Prisma.KeyCreateWithoutCreatedByInput[] | Prisma.KeyUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutCreatedByInput | Prisma.KeyCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.KeyUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.KeyUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.KeyCreateManyCreatedByInputEnvelope;
    set?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    disconnect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    delete?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    connect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    update?: Prisma.KeyUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.KeyUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.KeyUpdateManyWithWhereWithoutCreatedByInput | Prisma.KeyUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.KeyScalarWhereInput | Prisma.KeyScalarWhereInput[];
};
export type KeyUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutCreatedByInput, Prisma.KeyUncheckedCreateWithoutCreatedByInput> | Prisma.KeyCreateWithoutCreatedByInput[] | Prisma.KeyUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutCreatedByInput | Prisma.KeyCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.KeyUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.KeyUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.KeyCreateManyCreatedByInputEnvelope;
    set?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    disconnect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    delete?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    connect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    update?: Prisma.KeyUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.KeyUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.KeyUpdateManyWithWhereWithoutCreatedByInput | Prisma.KeyUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.KeyScalarWhereInput | Prisma.KeyScalarWhereInput[];
};
export type KeyCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutProductInput, Prisma.KeyUncheckedCreateWithoutProductInput> | Prisma.KeyCreateWithoutProductInput[] | Prisma.KeyUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutProductInput | Prisma.KeyCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.KeyCreateManyProductInputEnvelope;
    connect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
};
export type KeyUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutProductInput, Prisma.KeyUncheckedCreateWithoutProductInput> | Prisma.KeyCreateWithoutProductInput[] | Prisma.KeyUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutProductInput | Prisma.KeyCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.KeyCreateManyProductInputEnvelope;
    connect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
};
export type KeyUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutProductInput, Prisma.KeyUncheckedCreateWithoutProductInput> | Prisma.KeyCreateWithoutProductInput[] | Prisma.KeyUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutProductInput | Prisma.KeyCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.KeyUpsertWithWhereUniqueWithoutProductInput | Prisma.KeyUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.KeyCreateManyProductInputEnvelope;
    set?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    disconnect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    delete?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    connect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    update?: Prisma.KeyUpdateWithWhereUniqueWithoutProductInput | Prisma.KeyUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.KeyUpdateManyWithWhereWithoutProductInput | Prisma.KeyUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.KeyScalarWhereInput | Prisma.KeyScalarWhereInput[];
};
export type KeyUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutProductInput, Prisma.KeyUncheckedCreateWithoutProductInput> | Prisma.KeyCreateWithoutProductInput[] | Prisma.KeyUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutProductInput | Prisma.KeyCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.KeyUpsertWithWhereUniqueWithoutProductInput | Prisma.KeyUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.KeyCreateManyProductInputEnvelope;
    set?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    disconnect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    delete?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    connect?: Prisma.KeyWhereUniqueInput | Prisma.KeyWhereUniqueInput[];
    update?: Prisma.KeyUpdateWithWhereUniqueWithoutProductInput | Prisma.KeyUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.KeyUpdateManyWithWhereWithoutProductInput | Prisma.KeyUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.KeyScalarWhereInput | Prisma.KeyScalarWhereInput[];
};
export type EnumKeyStatusFieldUpdateOperationsInput = {
    set?: $Enums.KeyStatus;
};
export type KeyCreateNestedOneWithoutClientInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutClientInput, Prisma.KeyUncheckedCreateWithoutClientInput>;
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutClientInput;
    connect?: Prisma.KeyWhereUniqueInput;
};
export type KeyUpdateOneRequiredWithoutClientNestedInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutClientInput, Prisma.KeyUncheckedCreateWithoutClientInput>;
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutClientInput;
    upsert?: Prisma.KeyUpsertWithoutClientInput;
    connect?: Prisma.KeyWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.KeyUpdateToOneWithWhereWithoutClientInput, Prisma.KeyUpdateWithoutClientInput>, Prisma.KeyUncheckedUpdateWithoutClientInput>;
};
export type KeyCreateNestedOneWithoutUsageLogsInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutUsageLogsInput, Prisma.KeyUncheckedCreateWithoutUsageLogsInput>;
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutUsageLogsInput;
    connect?: Prisma.KeyWhereUniqueInput;
};
export type KeyUpdateOneRequiredWithoutUsageLogsNestedInput = {
    create?: Prisma.XOR<Prisma.KeyCreateWithoutUsageLogsInput, Prisma.KeyUncheckedCreateWithoutUsageLogsInput>;
    connectOrCreate?: Prisma.KeyCreateOrConnectWithoutUsageLogsInput;
    upsert?: Prisma.KeyUpsertWithoutUsageLogsInput;
    connect?: Prisma.KeyWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.KeyUpdateToOneWithWhereWithoutUsageLogsInput, Prisma.KeyUpdateWithoutUsageLogsInput>, Prisma.KeyUncheckedUpdateWithoutUsageLogsInput>;
};
export type KeyCreateWithoutCreatedByInput = {
    id?: string;
    value: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutKeysInput;
    usageLogs?: Prisma.KeyUsageLogCreateNestedManyWithoutKeyInput;
    client?: Prisma.ClientCreateNestedOneWithoutKeyInput;
};
export type KeyUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    value: string;
    productId: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    usageLogs?: Prisma.KeyUsageLogUncheckedCreateNestedManyWithoutKeyInput;
    client?: Prisma.ClientUncheckedCreateNestedOneWithoutKeyInput;
};
export type KeyCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.KeyWhereUniqueInput;
    create: Prisma.XOR<Prisma.KeyCreateWithoutCreatedByInput, Prisma.KeyUncheckedCreateWithoutCreatedByInput>;
};
export type KeyCreateManyCreatedByInputEnvelope = {
    data: Prisma.KeyCreateManyCreatedByInput | Prisma.KeyCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type KeyUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.KeyWhereUniqueInput;
    update: Prisma.XOR<Prisma.KeyUpdateWithoutCreatedByInput, Prisma.KeyUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.KeyCreateWithoutCreatedByInput, Prisma.KeyUncheckedCreateWithoutCreatedByInput>;
};
export type KeyUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.KeyWhereUniqueInput;
    data: Prisma.XOR<Prisma.KeyUpdateWithoutCreatedByInput, Prisma.KeyUncheckedUpdateWithoutCreatedByInput>;
};
export type KeyUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.KeyScalarWhereInput;
    data: Prisma.XOR<Prisma.KeyUpdateManyMutationInput, Prisma.KeyUncheckedUpdateManyWithoutCreatedByInput>;
};
export type KeyScalarWhereInput = {
    AND?: Prisma.KeyScalarWhereInput | Prisma.KeyScalarWhereInput[];
    OR?: Prisma.KeyScalarWhereInput[];
    NOT?: Prisma.KeyScalarWhereInput | Prisma.KeyScalarWhereInput[];
    id?: Prisma.StringFilter<"Key"> | string;
    value?: Prisma.StringFilter<"Key"> | string;
    productId?: Prisma.StringFilter<"Key"> | string;
    createdById?: Prisma.StringFilter<"Key"> | string;
    customerEmail?: Prisma.StringNullableFilter<"Key"> | string | null;
    customerName?: Prisma.StringNullableFilter<"Key"> | string | null;
    status?: Prisma.EnumKeyStatusFilter<"Key"> | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFilter<"Key"> | boolean;
    activatedAt?: Prisma.DateTimeNullableFilter<"Key"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"Key"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Key"> | Date | string;
};
export type KeyCreateWithoutProductInput = {
    id?: string;
    value: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    createdBy: Prisma.AdminCreateNestedOneWithoutKeysInput;
    usageLogs?: Prisma.KeyUsageLogCreateNestedManyWithoutKeyInput;
    client?: Prisma.ClientCreateNestedOneWithoutKeyInput;
};
export type KeyUncheckedCreateWithoutProductInput = {
    id?: string;
    value: string;
    createdById: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    usageLogs?: Prisma.KeyUsageLogUncheckedCreateNestedManyWithoutKeyInput;
    client?: Prisma.ClientUncheckedCreateNestedOneWithoutKeyInput;
};
export type KeyCreateOrConnectWithoutProductInput = {
    where: Prisma.KeyWhereUniqueInput;
    create: Prisma.XOR<Prisma.KeyCreateWithoutProductInput, Prisma.KeyUncheckedCreateWithoutProductInput>;
};
export type KeyCreateManyProductInputEnvelope = {
    data: Prisma.KeyCreateManyProductInput | Prisma.KeyCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type KeyUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.KeyWhereUniqueInput;
    update: Prisma.XOR<Prisma.KeyUpdateWithoutProductInput, Prisma.KeyUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.KeyCreateWithoutProductInput, Prisma.KeyUncheckedCreateWithoutProductInput>;
};
export type KeyUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.KeyWhereUniqueInput;
    data: Prisma.XOR<Prisma.KeyUpdateWithoutProductInput, Prisma.KeyUncheckedUpdateWithoutProductInput>;
};
export type KeyUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.KeyScalarWhereInput;
    data: Prisma.XOR<Prisma.KeyUpdateManyMutationInput, Prisma.KeyUncheckedUpdateManyWithoutProductInput>;
};
export type KeyCreateWithoutClientInput = {
    id?: string;
    value: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutKeysInput;
    createdBy: Prisma.AdminCreateNestedOneWithoutKeysInput;
    usageLogs?: Prisma.KeyUsageLogCreateNestedManyWithoutKeyInput;
};
export type KeyUncheckedCreateWithoutClientInput = {
    id?: string;
    value: string;
    productId: string;
    createdById: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    usageLogs?: Prisma.KeyUsageLogUncheckedCreateNestedManyWithoutKeyInput;
};
export type KeyCreateOrConnectWithoutClientInput = {
    where: Prisma.KeyWhereUniqueInput;
    create: Prisma.XOR<Prisma.KeyCreateWithoutClientInput, Prisma.KeyUncheckedCreateWithoutClientInput>;
};
export type KeyUpsertWithoutClientInput = {
    update: Prisma.XOR<Prisma.KeyUpdateWithoutClientInput, Prisma.KeyUncheckedUpdateWithoutClientInput>;
    create: Prisma.XOR<Prisma.KeyCreateWithoutClientInput, Prisma.KeyUncheckedCreateWithoutClientInput>;
    where?: Prisma.KeyWhereInput;
};
export type KeyUpdateToOneWithWhereWithoutClientInput = {
    where?: Prisma.KeyWhereInput;
    data: Prisma.XOR<Prisma.KeyUpdateWithoutClientInput, Prisma.KeyUncheckedUpdateWithoutClientInput>;
};
export type KeyUpdateWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutKeysNestedInput;
    createdBy?: Prisma.AdminUpdateOneRequiredWithoutKeysNestedInput;
    usageLogs?: Prisma.KeyUsageLogUpdateManyWithoutKeyNestedInput;
};
export type KeyUncheckedUpdateWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usageLogs?: Prisma.KeyUsageLogUncheckedUpdateManyWithoutKeyNestedInput;
};
export type KeyCreateWithoutUsageLogsInput = {
    id?: string;
    value: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutKeysInput;
    createdBy: Prisma.AdminCreateNestedOneWithoutKeysInput;
    client?: Prisma.ClientCreateNestedOneWithoutKeyInput;
};
export type KeyUncheckedCreateWithoutUsageLogsInput = {
    id?: string;
    value: string;
    productId: string;
    createdById: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    client?: Prisma.ClientUncheckedCreateNestedOneWithoutKeyInput;
};
export type KeyCreateOrConnectWithoutUsageLogsInput = {
    where: Prisma.KeyWhereUniqueInput;
    create: Prisma.XOR<Prisma.KeyCreateWithoutUsageLogsInput, Prisma.KeyUncheckedCreateWithoutUsageLogsInput>;
};
export type KeyUpsertWithoutUsageLogsInput = {
    update: Prisma.XOR<Prisma.KeyUpdateWithoutUsageLogsInput, Prisma.KeyUncheckedUpdateWithoutUsageLogsInput>;
    create: Prisma.XOR<Prisma.KeyCreateWithoutUsageLogsInput, Prisma.KeyUncheckedCreateWithoutUsageLogsInput>;
    where?: Prisma.KeyWhereInput;
};
export type KeyUpdateToOneWithWhereWithoutUsageLogsInput = {
    where?: Prisma.KeyWhereInput;
    data: Prisma.XOR<Prisma.KeyUpdateWithoutUsageLogsInput, Prisma.KeyUncheckedUpdateWithoutUsageLogsInput>;
};
export type KeyUpdateWithoutUsageLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutKeysNestedInput;
    createdBy?: Prisma.AdminUpdateOneRequiredWithoutKeysNestedInput;
    client?: Prisma.ClientUpdateOneWithoutKeyNestedInput;
};
export type KeyUncheckedUpdateWithoutUsageLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    client?: Prisma.ClientUncheckedUpdateOneWithoutKeyNestedInput;
};
export type KeyCreateManyCreatedByInput = {
    id?: string;
    value: string;
    productId: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
};
export type KeyUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutKeysNestedInput;
    usageLogs?: Prisma.KeyUsageLogUpdateManyWithoutKeyNestedInput;
    client?: Prisma.ClientUpdateOneWithoutKeyNestedInput;
};
export type KeyUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usageLogs?: Prisma.KeyUsageLogUncheckedUpdateManyWithoutKeyNestedInput;
    client?: Prisma.ClientUncheckedUpdateOneWithoutKeyNestedInput;
};
export type KeyUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KeyCreateManyProductInput = {
    id?: string;
    value: string;
    createdById: string;
    customerEmail?: string | null;
    customerName?: string | null;
    status?: $Enums.KeyStatus;
    isPermanent?: boolean;
    activatedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
};
export type KeyUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.AdminUpdateOneRequiredWithoutKeysNestedInput;
    usageLogs?: Prisma.KeyUsageLogUpdateManyWithoutKeyNestedInput;
    client?: Prisma.ClientUpdateOneWithoutKeyNestedInput;
};
export type KeyUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usageLogs?: Prisma.KeyUsageLogUncheckedUpdateManyWithoutKeyNestedInput;
    client?: Prisma.ClientUncheckedUpdateOneWithoutKeyNestedInput;
};
export type KeyUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    customerEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    customerName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumKeyStatusFieldUpdateOperationsInput | $Enums.KeyStatus;
    isPermanent?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    activatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type KeyCountOutputType
 */
export type KeyCountOutputType = {
    usageLogs: number;
};
export type KeyCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    usageLogs?: boolean | KeyCountOutputTypeCountUsageLogsArgs;
};
/**
 * KeyCountOutputType without action
 */
export type KeyCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyCountOutputType
     */
    select?: Prisma.KeyCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * KeyCountOutputType without action
 */
export type KeyCountOutputTypeCountUsageLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KeyUsageLogWhereInput;
};
export type KeySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    value?: boolean;
    productId?: boolean;
    createdById?: boolean;
    customerEmail?: boolean;
    customerName?: boolean;
    status?: boolean;
    isPermanent?: boolean;
    activatedAt?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.AdminDefaultArgs<ExtArgs>;
    usageLogs?: boolean | Prisma.Key$usageLogsArgs<ExtArgs>;
    client?: boolean | Prisma.Key$clientArgs<ExtArgs>;
    _count?: boolean | Prisma.KeyCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["key"]>;
export type KeySelectScalar = {
    id?: boolean;
    value?: boolean;
    productId?: boolean;
    createdById?: boolean;
    customerEmail?: boolean;
    customerName?: boolean;
    status?: boolean;
    isPermanent?: boolean;
    activatedAt?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
};
export type KeyOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "value" | "productId" | "createdById" | "customerEmail" | "customerName" | "status" | "isPermanent" | "activatedAt" | "expiresAt" | "createdAt", ExtArgs["result"]["key"]>;
export type KeyInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.AdminDefaultArgs<ExtArgs>;
    usageLogs?: boolean | Prisma.Key$usageLogsArgs<ExtArgs>;
    client?: boolean | Prisma.Key$clientArgs<ExtArgs>;
    _count?: boolean | Prisma.KeyCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $KeyPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Key";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        createdBy: Prisma.$AdminPayload<ExtArgs>;
        usageLogs: Prisma.$KeyUsageLogPayload<ExtArgs>[];
        client: Prisma.$ClientPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: $Enums.KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
        expiresAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["key"]>;
    composites: {};
};
export type KeyGetPayload<S extends boolean | null | undefined | KeyDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KeyPayload, S>;
export type KeyCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<KeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: KeyCountAggregateInputType | true;
};
export interface KeyDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Key'];
        meta: {
            name: 'Key';
        };
    };
    /**
     * Find zero or one Key that matches the filter.
     * @param {KeyFindUniqueArgs} args - Arguments to find a Key
     * @example
     * // Get one Key
     * const key = await prisma.key.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KeyFindUniqueArgs>(args: Prisma.SelectSubset<T, KeyFindUniqueArgs<ExtArgs>>): Prisma.Prisma__KeyClient<runtime.Types.Result.GetResult<Prisma.$KeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Key that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KeyFindUniqueOrThrowArgs} args - Arguments to find a Key
     * @example
     * // Get one Key
     * const key = await prisma.key.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KeyFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, KeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__KeyClient<runtime.Types.Result.GetResult<Prisma.$KeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Key that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyFindFirstArgs} args - Arguments to find a Key
     * @example
     * // Get one Key
     * const key = await prisma.key.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KeyFindFirstArgs>(args?: Prisma.SelectSubset<T, KeyFindFirstArgs<ExtArgs>>): Prisma.Prisma__KeyClient<runtime.Types.Result.GetResult<Prisma.$KeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Key that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyFindFirstOrThrowArgs} args - Arguments to find a Key
     * @example
     * // Get one Key
     * const key = await prisma.key.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KeyFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, KeyFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__KeyClient<runtime.Types.Result.GetResult<Prisma.$KeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Keys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Keys
     * const keys = await prisma.key.findMany()
     *
     * // Get first 10 Keys
     * const keys = await prisma.key.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const keyWithIdOnly = await prisma.key.findMany({ select: { id: true } })
     *
     */
    findMany<T extends KeyFindManyArgs>(args?: Prisma.SelectSubset<T, KeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Key.
     * @param {KeyCreateArgs} args - Arguments to create a Key.
     * @example
     * // Create one Key
     * const Key = await prisma.key.create({
     *   data: {
     *     // ... data to create a Key
     *   }
     * })
     *
     */
    create<T extends KeyCreateArgs>(args: Prisma.SelectSubset<T, KeyCreateArgs<ExtArgs>>): Prisma.Prisma__KeyClient<runtime.Types.Result.GetResult<Prisma.$KeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Keys.
     * @param {KeyCreateManyArgs} args - Arguments to create many Keys.
     * @example
     * // Create many Keys
     * const key = await prisma.key.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends KeyCreateManyArgs>(args?: Prisma.SelectSubset<T, KeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a Key.
     * @param {KeyDeleteArgs} args - Arguments to delete one Key.
     * @example
     * // Delete one Key
     * const Key = await prisma.key.delete({
     *   where: {
     *     // ... filter to delete one Key
     *   }
     * })
     *
     */
    delete<T extends KeyDeleteArgs>(args: Prisma.SelectSubset<T, KeyDeleteArgs<ExtArgs>>): Prisma.Prisma__KeyClient<runtime.Types.Result.GetResult<Prisma.$KeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Key.
     * @param {KeyUpdateArgs} args - Arguments to update one Key.
     * @example
     * // Update one Key
     * const key = await prisma.key.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends KeyUpdateArgs>(args: Prisma.SelectSubset<T, KeyUpdateArgs<ExtArgs>>): Prisma.Prisma__KeyClient<runtime.Types.Result.GetResult<Prisma.$KeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Keys.
     * @param {KeyDeleteManyArgs} args - Arguments to filter Keys to delete.
     * @example
     * // Delete a few Keys
     * const { count } = await prisma.key.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends KeyDeleteManyArgs>(args?: Prisma.SelectSubset<T, KeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Keys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Keys
     * const key = await prisma.key.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends KeyUpdateManyArgs>(args: Prisma.SelectSubset<T, KeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one Key.
     * @param {KeyUpsertArgs} args - Arguments to update or create a Key.
     * @example
     * // Update or create a Key
     * const key = await prisma.key.upsert({
     *   create: {
     *     // ... data to create a Key
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Key we want to update
     *   }
     * })
     */
    upsert<T extends KeyUpsertArgs>(args: Prisma.SelectSubset<T, KeyUpsertArgs<ExtArgs>>): Prisma.Prisma__KeyClient<runtime.Types.Result.GetResult<Prisma.$KeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Keys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyCountArgs} args - Arguments to filter Keys to count.
     * @example
     * // Count the number of Keys
     * const count = await prisma.key.count({
     *   where: {
     *     // ... the filter for the Keys we want to count
     *   }
     * })
    **/
    count<T extends KeyCountArgs>(args?: Prisma.Subset<T, KeyCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], KeyCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Key.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KeyAggregateArgs>(args: Prisma.Subset<T, KeyAggregateArgs>): Prisma.PrismaPromise<GetKeyAggregateType<T>>;
    /**
     * Group by Key.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyGroupByArgs} args - Group by arguments.
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
    groupBy<T extends KeyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: KeyGroupByArgs['orderBy'];
    } : {
        orderBy?: KeyGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, KeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Key model
     */
    readonly fields: KeyFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Key.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__KeyClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.AdminDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AdminDefaultArgs<ExtArgs>>): Prisma.Prisma__AdminClient<runtime.Types.Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    usageLogs<T extends Prisma.Key$usageLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Key$usageLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KeyUsageLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    client<T extends Prisma.Key$clientArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Key$clientArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the Key model
 */
export interface KeyFieldRefs {
    readonly id: Prisma.FieldRef<"Key", 'String'>;
    readonly value: Prisma.FieldRef<"Key", 'String'>;
    readonly productId: Prisma.FieldRef<"Key", 'String'>;
    readonly createdById: Prisma.FieldRef<"Key", 'String'>;
    readonly customerEmail: Prisma.FieldRef<"Key", 'String'>;
    readonly customerName: Prisma.FieldRef<"Key", 'String'>;
    readonly status: Prisma.FieldRef<"Key", 'KeyStatus'>;
    readonly isPermanent: Prisma.FieldRef<"Key", 'Boolean'>;
    readonly activatedAt: Prisma.FieldRef<"Key", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"Key", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Key", 'DateTime'>;
}
/**
 * Key findUnique
 */
export type KeyFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Key
     */
    select?: Prisma.KeySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Key
     */
    omit?: Prisma.KeyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyInclude<ExtArgs> | null;
    /**
     * Filter, which Key to fetch.
     */
    where: Prisma.KeyWhereUniqueInput;
};
/**
 * Key findUniqueOrThrow
 */
export type KeyFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Key
     */
    select?: Prisma.KeySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Key
     */
    omit?: Prisma.KeyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyInclude<ExtArgs> | null;
    /**
     * Filter, which Key to fetch.
     */
    where: Prisma.KeyWhereUniqueInput;
};
/**
 * Key findFirst
 */
export type KeyFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Key
     */
    select?: Prisma.KeySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Key
     */
    omit?: Prisma.KeyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyInclude<ExtArgs> | null;
    /**
     * Filter, which Key to fetch.
     */
    where?: Prisma.KeyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Keys to fetch.
     */
    orderBy?: Prisma.KeyOrderByWithRelationInput | Prisma.KeyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Keys.
     */
    cursor?: Prisma.KeyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Keys from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Keys.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Keys.
     */
    distinct?: Prisma.KeyScalarFieldEnum | Prisma.KeyScalarFieldEnum[];
};
/**
 * Key findFirstOrThrow
 */
export type KeyFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Key
     */
    select?: Prisma.KeySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Key
     */
    omit?: Prisma.KeyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyInclude<ExtArgs> | null;
    /**
     * Filter, which Key to fetch.
     */
    where?: Prisma.KeyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Keys to fetch.
     */
    orderBy?: Prisma.KeyOrderByWithRelationInput | Prisma.KeyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Keys.
     */
    cursor?: Prisma.KeyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Keys from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Keys.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Keys.
     */
    distinct?: Prisma.KeyScalarFieldEnum | Prisma.KeyScalarFieldEnum[];
};
/**
 * Key findMany
 */
export type KeyFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Key
     */
    select?: Prisma.KeySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Key
     */
    omit?: Prisma.KeyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyInclude<ExtArgs> | null;
    /**
     * Filter, which Keys to fetch.
     */
    where?: Prisma.KeyWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Keys to fetch.
     */
    orderBy?: Prisma.KeyOrderByWithRelationInput | Prisma.KeyOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Keys.
     */
    cursor?: Prisma.KeyWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Keys from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Keys.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Keys.
     */
    distinct?: Prisma.KeyScalarFieldEnum | Prisma.KeyScalarFieldEnum[];
};
/**
 * Key create
 */
export type KeyCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Key
     */
    select?: Prisma.KeySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Key
     */
    omit?: Prisma.KeyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyInclude<ExtArgs> | null;
    /**
     * The data needed to create a Key.
     */
    data: Prisma.XOR<Prisma.KeyCreateInput, Prisma.KeyUncheckedCreateInput>;
};
/**
 * Key createMany
 */
export type KeyCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Keys.
     */
    data: Prisma.KeyCreateManyInput | Prisma.KeyCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Key update
 */
export type KeyUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Key
     */
    select?: Prisma.KeySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Key
     */
    omit?: Prisma.KeyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyInclude<ExtArgs> | null;
    /**
     * The data needed to update a Key.
     */
    data: Prisma.XOR<Prisma.KeyUpdateInput, Prisma.KeyUncheckedUpdateInput>;
    /**
     * Choose, which Key to update.
     */
    where: Prisma.KeyWhereUniqueInput;
};
/**
 * Key updateMany
 */
export type KeyUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Keys.
     */
    data: Prisma.XOR<Prisma.KeyUpdateManyMutationInput, Prisma.KeyUncheckedUpdateManyInput>;
    /**
     * Filter which Keys to update
     */
    where?: Prisma.KeyWhereInput;
    /**
     * Limit how many Keys to update.
     */
    limit?: number;
};
/**
 * Key upsert
 */
export type KeyUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Key
     */
    select?: Prisma.KeySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Key
     */
    omit?: Prisma.KeyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyInclude<ExtArgs> | null;
    /**
     * The filter to search for the Key to update in case it exists.
     */
    where: Prisma.KeyWhereUniqueInput;
    /**
     * In case the Key found by the `where` argument doesn't exist, create a new Key with this data.
     */
    create: Prisma.XOR<Prisma.KeyCreateInput, Prisma.KeyUncheckedCreateInput>;
    /**
     * In case the Key was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.KeyUpdateInput, Prisma.KeyUncheckedUpdateInput>;
};
/**
 * Key delete
 */
export type KeyDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Key
     */
    select?: Prisma.KeySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Key
     */
    omit?: Prisma.KeyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyInclude<ExtArgs> | null;
    /**
     * Filter which Key to delete.
     */
    where: Prisma.KeyWhereUniqueInput;
};
/**
 * Key deleteMany
 */
export type KeyDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Keys to delete
     */
    where?: Prisma.KeyWhereInput;
    /**
     * Limit how many Keys to delete.
     */
    limit?: number;
};
/**
 * Key.usageLogs
 */
export type Key$usageLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.KeyUsageLogWhereInput;
    orderBy?: Prisma.KeyUsageLogOrderByWithRelationInput | Prisma.KeyUsageLogOrderByWithRelationInput[];
    cursor?: Prisma.KeyUsageLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KeyUsageLogScalarFieldEnum | Prisma.KeyUsageLogScalarFieldEnum[];
};
/**
 * Key.client
 */
export type Key$clientArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: Prisma.ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: Prisma.ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientInclude<ExtArgs> | null;
    where?: Prisma.ClientWhereInput;
};
/**
 * Key without action
 */
export type KeyDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Key
     */
    select?: Prisma.KeySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Key
     */
    omit?: Prisma.KeyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.KeyInclude<ExtArgs> | null;
};
