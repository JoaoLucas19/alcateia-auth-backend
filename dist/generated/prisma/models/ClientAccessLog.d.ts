import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ClientAccessLog
 * Tentativas de login/cadastro do cliente (cheat)
 */
export type ClientAccessLogModel = runtime.Types.Result.DefaultSelection<Prisma.$ClientAccessLogPayload>;
export type AggregateClientAccessLog = {
    _count: ClientAccessLogCountAggregateOutputType | null;
    _min: ClientAccessLogMinAggregateOutputType | null;
    _max: ClientAccessLogMaxAggregateOutputType | null;
};
export type ClientAccessLogMinAggregateOutputType = {
    id: string | null;
    clientId: string | null;
    usernameAttempted: string | null;
    ipAddress: string | null;
    hwid: string | null;
    action: string | null;
    success: boolean | null;
    reason: string | null;
    createdAt: Date | null;
};
export type ClientAccessLogMaxAggregateOutputType = {
    id: string | null;
    clientId: string | null;
    usernameAttempted: string | null;
    ipAddress: string | null;
    hwid: string | null;
    action: string | null;
    success: boolean | null;
    reason: string | null;
    createdAt: Date | null;
};
export type ClientAccessLogCountAggregateOutputType = {
    id: number;
    clientId: number;
    usernameAttempted: number;
    ipAddress: number;
    hwid: number;
    action: number;
    success: number;
    reason: number;
    createdAt: number;
    _all: number;
};
export type ClientAccessLogMinAggregateInputType = {
    id?: true;
    clientId?: true;
    usernameAttempted?: true;
    ipAddress?: true;
    hwid?: true;
    action?: true;
    success?: true;
    reason?: true;
    createdAt?: true;
};
export type ClientAccessLogMaxAggregateInputType = {
    id?: true;
    clientId?: true;
    usernameAttempted?: true;
    ipAddress?: true;
    hwid?: true;
    action?: true;
    success?: true;
    reason?: true;
    createdAt?: true;
};
export type ClientAccessLogCountAggregateInputType = {
    id?: true;
    clientId?: true;
    usernameAttempted?: true;
    ipAddress?: true;
    hwid?: true;
    action?: true;
    success?: true;
    reason?: true;
    createdAt?: true;
    _all?: true;
};
export type ClientAccessLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ClientAccessLog to aggregate.
     */
    where?: Prisma.ClientAccessLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ClientAccessLogs to fetch.
     */
    orderBy?: Prisma.ClientAccessLogOrderByWithRelationInput | Prisma.ClientAccessLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ClientAccessLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ClientAccessLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ClientAccessLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ClientAccessLogs
    **/
    _count?: true | ClientAccessLogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ClientAccessLogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ClientAccessLogMaxAggregateInputType;
};
export type GetClientAccessLogAggregateType<T extends ClientAccessLogAggregateArgs> = {
    [P in keyof T & keyof AggregateClientAccessLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateClientAccessLog[P]> : Prisma.GetScalarType<T[P], AggregateClientAccessLog[P]>;
};
export type ClientAccessLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClientAccessLogWhereInput;
    orderBy?: Prisma.ClientAccessLogOrderByWithAggregationInput | Prisma.ClientAccessLogOrderByWithAggregationInput[];
    by: Prisma.ClientAccessLogScalarFieldEnum[] | Prisma.ClientAccessLogScalarFieldEnum;
    having?: Prisma.ClientAccessLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClientAccessLogCountAggregateInputType | true;
    _min?: ClientAccessLogMinAggregateInputType;
    _max?: ClientAccessLogMaxAggregateInputType;
};
export type ClientAccessLogGroupByOutputType = {
    id: string;
    clientId: string | null;
    usernameAttempted: string;
    ipAddress: string;
    hwid: string | null;
    action: string;
    success: boolean;
    reason: string | null;
    createdAt: Date;
    _count: ClientAccessLogCountAggregateOutputType | null;
    _min: ClientAccessLogMinAggregateOutputType | null;
    _max: ClientAccessLogMaxAggregateOutputType | null;
};
export type GetClientAccessLogGroupByPayload<T extends ClientAccessLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ClientAccessLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ClientAccessLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ClientAccessLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ClientAccessLogGroupByOutputType[P]>;
}>>;
export type ClientAccessLogWhereInput = {
    AND?: Prisma.ClientAccessLogWhereInput | Prisma.ClientAccessLogWhereInput[];
    OR?: Prisma.ClientAccessLogWhereInput[];
    NOT?: Prisma.ClientAccessLogWhereInput | Prisma.ClientAccessLogWhereInput[];
    id?: Prisma.StringFilter<"ClientAccessLog"> | string;
    clientId?: Prisma.StringNullableFilter<"ClientAccessLog"> | string | null;
    usernameAttempted?: Prisma.StringFilter<"ClientAccessLog"> | string;
    ipAddress?: Prisma.StringFilter<"ClientAccessLog"> | string;
    hwid?: Prisma.StringNullableFilter<"ClientAccessLog"> | string | null;
    action?: Prisma.StringFilter<"ClientAccessLog"> | string;
    success?: Prisma.BoolFilter<"ClientAccessLog"> | boolean;
    reason?: Prisma.StringNullableFilter<"ClientAccessLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ClientAccessLog"> | Date | string;
    client?: Prisma.XOR<Prisma.ClientNullableScalarRelationFilter, Prisma.ClientWhereInput> | null;
};
export type ClientAccessLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrderInput | Prisma.SortOrder;
    usernameAttempted?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    hwid?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    client?: Prisma.ClientOrderByWithRelationInput;
    _relevance?: Prisma.ClientAccessLogOrderByRelevanceInput;
};
export type ClientAccessLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ClientAccessLogWhereInput | Prisma.ClientAccessLogWhereInput[];
    OR?: Prisma.ClientAccessLogWhereInput[];
    NOT?: Prisma.ClientAccessLogWhereInput | Prisma.ClientAccessLogWhereInput[];
    clientId?: Prisma.StringNullableFilter<"ClientAccessLog"> | string | null;
    usernameAttempted?: Prisma.StringFilter<"ClientAccessLog"> | string;
    ipAddress?: Prisma.StringFilter<"ClientAccessLog"> | string;
    hwid?: Prisma.StringNullableFilter<"ClientAccessLog"> | string | null;
    action?: Prisma.StringFilter<"ClientAccessLog"> | string;
    success?: Prisma.BoolFilter<"ClientAccessLog"> | boolean;
    reason?: Prisma.StringNullableFilter<"ClientAccessLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ClientAccessLog"> | Date | string;
    client?: Prisma.XOR<Prisma.ClientNullableScalarRelationFilter, Prisma.ClientWhereInput> | null;
}, "id">;
export type ClientAccessLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrderInput | Prisma.SortOrder;
    usernameAttempted?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    hwid?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ClientAccessLogCountOrderByAggregateInput;
    _max?: Prisma.ClientAccessLogMaxOrderByAggregateInput;
    _min?: Prisma.ClientAccessLogMinOrderByAggregateInput;
};
export type ClientAccessLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.ClientAccessLogScalarWhereWithAggregatesInput | Prisma.ClientAccessLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.ClientAccessLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ClientAccessLogScalarWhereWithAggregatesInput | Prisma.ClientAccessLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ClientAccessLog"> | string;
    clientId?: Prisma.StringNullableWithAggregatesFilter<"ClientAccessLog"> | string | null;
    usernameAttempted?: Prisma.StringWithAggregatesFilter<"ClientAccessLog"> | string;
    ipAddress?: Prisma.StringWithAggregatesFilter<"ClientAccessLog"> | string;
    hwid?: Prisma.StringNullableWithAggregatesFilter<"ClientAccessLog"> | string | null;
    action?: Prisma.StringWithAggregatesFilter<"ClientAccessLog"> | string;
    success?: Prisma.BoolWithAggregatesFilter<"ClientAccessLog"> | boolean;
    reason?: Prisma.StringNullableWithAggregatesFilter<"ClientAccessLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ClientAccessLog"> | Date | string;
};
export type ClientAccessLogCreateInput = {
    id?: string;
    usernameAttempted: string;
    ipAddress: string;
    hwid?: string | null;
    action?: string;
    success: boolean;
    reason?: string | null;
    createdAt?: Date | string;
    client?: Prisma.ClientCreateNestedOneWithoutAccessLogsInput;
};
export type ClientAccessLogUncheckedCreateInput = {
    id?: string;
    clientId?: string | null;
    usernameAttempted: string;
    ipAddress: string;
    hwid?: string | null;
    action?: string;
    success: boolean;
    reason?: string | null;
    createdAt?: Date | string;
};
export type ClientAccessLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usernameAttempted?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    client?: Prisma.ClientUpdateOneWithoutAccessLogsNestedInput;
};
export type ClientAccessLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usernameAttempted?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClientAccessLogCreateManyInput = {
    id?: string;
    clientId?: string | null;
    usernameAttempted: string;
    ipAddress: string;
    hwid?: string | null;
    action?: string;
    success: boolean;
    reason?: string | null;
    createdAt?: Date | string;
};
export type ClientAccessLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usernameAttempted?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClientAccessLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    clientId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    usernameAttempted?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClientAccessLogListRelationFilter = {
    every?: Prisma.ClientAccessLogWhereInput;
    some?: Prisma.ClientAccessLogWhereInput;
    none?: Prisma.ClientAccessLogWhereInput;
};
export type ClientAccessLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ClientAccessLogOrderByRelevanceInput = {
    fields: Prisma.ClientAccessLogOrderByRelevanceFieldEnum | Prisma.ClientAccessLogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ClientAccessLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    usernameAttempted?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    hwid?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClientAccessLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    usernameAttempted?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    hwid?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClientAccessLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    usernameAttempted?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    hwid?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ClientAccessLogCreateNestedManyWithoutClientInput = {
    create?: Prisma.XOR<Prisma.ClientAccessLogCreateWithoutClientInput, Prisma.ClientAccessLogUncheckedCreateWithoutClientInput> | Prisma.ClientAccessLogCreateWithoutClientInput[] | Prisma.ClientAccessLogUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.ClientAccessLogCreateOrConnectWithoutClientInput | Prisma.ClientAccessLogCreateOrConnectWithoutClientInput[];
    createMany?: Prisma.ClientAccessLogCreateManyClientInputEnvelope;
    connect?: Prisma.ClientAccessLogWhereUniqueInput | Prisma.ClientAccessLogWhereUniqueInput[];
};
export type ClientAccessLogUncheckedCreateNestedManyWithoutClientInput = {
    create?: Prisma.XOR<Prisma.ClientAccessLogCreateWithoutClientInput, Prisma.ClientAccessLogUncheckedCreateWithoutClientInput> | Prisma.ClientAccessLogCreateWithoutClientInput[] | Prisma.ClientAccessLogUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.ClientAccessLogCreateOrConnectWithoutClientInput | Prisma.ClientAccessLogCreateOrConnectWithoutClientInput[];
    createMany?: Prisma.ClientAccessLogCreateManyClientInputEnvelope;
    connect?: Prisma.ClientAccessLogWhereUniqueInput | Prisma.ClientAccessLogWhereUniqueInput[];
};
export type ClientAccessLogUpdateManyWithoutClientNestedInput = {
    create?: Prisma.XOR<Prisma.ClientAccessLogCreateWithoutClientInput, Prisma.ClientAccessLogUncheckedCreateWithoutClientInput> | Prisma.ClientAccessLogCreateWithoutClientInput[] | Prisma.ClientAccessLogUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.ClientAccessLogCreateOrConnectWithoutClientInput | Prisma.ClientAccessLogCreateOrConnectWithoutClientInput[];
    upsert?: Prisma.ClientAccessLogUpsertWithWhereUniqueWithoutClientInput | Prisma.ClientAccessLogUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: Prisma.ClientAccessLogCreateManyClientInputEnvelope;
    set?: Prisma.ClientAccessLogWhereUniqueInput | Prisma.ClientAccessLogWhereUniqueInput[];
    disconnect?: Prisma.ClientAccessLogWhereUniqueInput | Prisma.ClientAccessLogWhereUniqueInput[];
    delete?: Prisma.ClientAccessLogWhereUniqueInput | Prisma.ClientAccessLogWhereUniqueInput[];
    connect?: Prisma.ClientAccessLogWhereUniqueInput | Prisma.ClientAccessLogWhereUniqueInput[];
    update?: Prisma.ClientAccessLogUpdateWithWhereUniqueWithoutClientInput | Prisma.ClientAccessLogUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?: Prisma.ClientAccessLogUpdateManyWithWhereWithoutClientInput | Prisma.ClientAccessLogUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: Prisma.ClientAccessLogScalarWhereInput | Prisma.ClientAccessLogScalarWhereInput[];
};
export type ClientAccessLogUncheckedUpdateManyWithoutClientNestedInput = {
    create?: Prisma.XOR<Prisma.ClientAccessLogCreateWithoutClientInput, Prisma.ClientAccessLogUncheckedCreateWithoutClientInput> | Prisma.ClientAccessLogCreateWithoutClientInput[] | Prisma.ClientAccessLogUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.ClientAccessLogCreateOrConnectWithoutClientInput | Prisma.ClientAccessLogCreateOrConnectWithoutClientInput[];
    upsert?: Prisma.ClientAccessLogUpsertWithWhereUniqueWithoutClientInput | Prisma.ClientAccessLogUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: Prisma.ClientAccessLogCreateManyClientInputEnvelope;
    set?: Prisma.ClientAccessLogWhereUniqueInput | Prisma.ClientAccessLogWhereUniqueInput[];
    disconnect?: Prisma.ClientAccessLogWhereUniqueInput | Prisma.ClientAccessLogWhereUniqueInput[];
    delete?: Prisma.ClientAccessLogWhereUniqueInput | Prisma.ClientAccessLogWhereUniqueInput[];
    connect?: Prisma.ClientAccessLogWhereUniqueInput | Prisma.ClientAccessLogWhereUniqueInput[];
    update?: Prisma.ClientAccessLogUpdateWithWhereUniqueWithoutClientInput | Prisma.ClientAccessLogUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?: Prisma.ClientAccessLogUpdateManyWithWhereWithoutClientInput | Prisma.ClientAccessLogUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: Prisma.ClientAccessLogScalarWhereInput | Prisma.ClientAccessLogScalarWhereInput[];
};
export type ClientAccessLogCreateWithoutClientInput = {
    id?: string;
    usernameAttempted: string;
    ipAddress: string;
    hwid?: string | null;
    action?: string;
    success: boolean;
    reason?: string | null;
    createdAt?: Date | string;
};
export type ClientAccessLogUncheckedCreateWithoutClientInput = {
    id?: string;
    usernameAttempted: string;
    ipAddress: string;
    hwid?: string | null;
    action?: string;
    success: boolean;
    reason?: string | null;
    createdAt?: Date | string;
};
export type ClientAccessLogCreateOrConnectWithoutClientInput = {
    where: Prisma.ClientAccessLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClientAccessLogCreateWithoutClientInput, Prisma.ClientAccessLogUncheckedCreateWithoutClientInput>;
};
export type ClientAccessLogCreateManyClientInputEnvelope = {
    data: Prisma.ClientAccessLogCreateManyClientInput | Prisma.ClientAccessLogCreateManyClientInput[];
    skipDuplicates?: boolean;
};
export type ClientAccessLogUpsertWithWhereUniqueWithoutClientInput = {
    where: Prisma.ClientAccessLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.ClientAccessLogUpdateWithoutClientInput, Prisma.ClientAccessLogUncheckedUpdateWithoutClientInput>;
    create: Prisma.XOR<Prisma.ClientAccessLogCreateWithoutClientInput, Prisma.ClientAccessLogUncheckedCreateWithoutClientInput>;
};
export type ClientAccessLogUpdateWithWhereUniqueWithoutClientInput = {
    where: Prisma.ClientAccessLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.ClientAccessLogUpdateWithoutClientInput, Prisma.ClientAccessLogUncheckedUpdateWithoutClientInput>;
};
export type ClientAccessLogUpdateManyWithWhereWithoutClientInput = {
    where: Prisma.ClientAccessLogScalarWhereInput;
    data: Prisma.XOR<Prisma.ClientAccessLogUpdateManyMutationInput, Prisma.ClientAccessLogUncheckedUpdateManyWithoutClientInput>;
};
export type ClientAccessLogScalarWhereInput = {
    AND?: Prisma.ClientAccessLogScalarWhereInput | Prisma.ClientAccessLogScalarWhereInput[];
    OR?: Prisma.ClientAccessLogScalarWhereInput[];
    NOT?: Prisma.ClientAccessLogScalarWhereInput | Prisma.ClientAccessLogScalarWhereInput[];
    id?: Prisma.StringFilter<"ClientAccessLog"> | string;
    clientId?: Prisma.StringNullableFilter<"ClientAccessLog"> | string | null;
    usernameAttempted?: Prisma.StringFilter<"ClientAccessLog"> | string;
    ipAddress?: Prisma.StringFilter<"ClientAccessLog"> | string;
    hwid?: Prisma.StringNullableFilter<"ClientAccessLog"> | string | null;
    action?: Prisma.StringFilter<"ClientAccessLog"> | string;
    success?: Prisma.BoolFilter<"ClientAccessLog"> | boolean;
    reason?: Prisma.StringNullableFilter<"ClientAccessLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ClientAccessLog"> | Date | string;
};
export type ClientAccessLogCreateManyClientInput = {
    id?: string;
    usernameAttempted: string;
    ipAddress: string;
    hwid?: string | null;
    action?: string;
    success: boolean;
    reason?: string | null;
    createdAt?: Date | string;
};
export type ClientAccessLogUpdateWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usernameAttempted?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClientAccessLogUncheckedUpdateWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usernameAttempted?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClientAccessLogUncheckedUpdateManyWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    usernameAttempted?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClientAccessLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    clientId?: boolean;
    usernameAttempted?: boolean;
    ipAddress?: boolean;
    hwid?: boolean;
    action?: boolean;
    success?: boolean;
    reason?: boolean;
    createdAt?: boolean;
    client?: boolean | Prisma.ClientAccessLog$clientArgs<ExtArgs>;
}, ExtArgs["result"]["clientAccessLog"]>;
export type ClientAccessLogSelectScalar = {
    id?: boolean;
    clientId?: boolean;
    usernameAttempted?: boolean;
    ipAddress?: boolean;
    hwid?: boolean;
    action?: boolean;
    success?: boolean;
    reason?: boolean;
    createdAt?: boolean;
};
export type ClientAccessLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "clientId" | "usernameAttempted" | "ipAddress" | "hwid" | "action" | "success" | "reason" | "createdAt", ExtArgs["result"]["clientAccessLog"]>;
export type ClientAccessLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    client?: boolean | Prisma.ClientAccessLog$clientArgs<ExtArgs>;
};
export type $ClientAccessLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ClientAccessLog";
    objects: {
        client: Prisma.$ClientPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        clientId: string | null;
        usernameAttempted: string;
        ipAddress: string;
        hwid: string | null;
        action: string;
        success: boolean;
        reason: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["clientAccessLog"]>;
    composites: {};
};
export type ClientAccessLogGetPayload<S extends boolean | null | undefined | ClientAccessLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ClientAccessLogPayload, S>;
export type ClientAccessLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ClientAccessLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ClientAccessLogCountAggregateInputType | true;
};
export interface ClientAccessLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ClientAccessLog'];
        meta: {
            name: 'ClientAccessLog';
        };
    };
    /**
     * Find zero or one ClientAccessLog that matches the filter.
     * @param {ClientAccessLogFindUniqueArgs} args - Arguments to find a ClientAccessLog
     * @example
     * // Get one ClientAccessLog
     * const clientAccessLog = await prisma.clientAccessLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientAccessLogFindUniqueArgs>(args: Prisma.SelectSubset<T, ClientAccessLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ClientAccessLogClient<runtime.Types.Result.GetResult<Prisma.$ClientAccessLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ClientAccessLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientAccessLogFindUniqueOrThrowArgs} args - Arguments to find a ClientAccessLog
     * @example
     * // Get one ClientAccessLog
     * const clientAccessLog = await prisma.clientAccessLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientAccessLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ClientAccessLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClientAccessLogClient<runtime.Types.Result.GetResult<Prisma.$ClientAccessLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ClientAccessLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAccessLogFindFirstArgs} args - Arguments to find a ClientAccessLog
     * @example
     * // Get one ClientAccessLog
     * const clientAccessLog = await prisma.clientAccessLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientAccessLogFindFirstArgs>(args?: Prisma.SelectSubset<T, ClientAccessLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__ClientAccessLogClient<runtime.Types.Result.GetResult<Prisma.$ClientAccessLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ClientAccessLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAccessLogFindFirstOrThrowArgs} args - Arguments to find a ClientAccessLog
     * @example
     * // Get one ClientAccessLog
     * const clientAccessLog = await prisma.clientAccessLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientAccessLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ClientAccessLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClientAccessLogClient<runtime.Types.Result.GetResult<Prisma.$ClientAccessLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ClientAccessLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAccessLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClientAccessLogs
     * const clientAccessLogs = await prisma.clientAccessLog.findMany()
     *
     * // Get first 10 ClientAccessLogs
     * const clientAccessLogs = await prisma.clientAccessLog.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const clientAccessLogWithIdOnly = await prisma.clientAccessLog.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ClientAccessLogFindManyArgs>(args?: Prisma.SelectSubset<T, ClientAccessLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClientAccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ClientAccessLog.
     * @param {ClientAccessLogCreateArgs} args - Arguments to create a ClientAccessLog.
     * @example
     * // Create one ClientAccessLog
     * const ClientAccessLog = await prisma.clientAccessLog.create({
     *   data: {
     *     // ... data to create a ClientAccessLog
     *   }
     * })
     *
     */
    create<T extends ClientAccessLogCreateArgs>(args: Prisma.SelectSubset<T, ClientAccessLogCreateArgs<ExtArgs>>): Prisma.Prisma__ClientAccessLogClient<runtime.Types.Result.GetResult<Prisma.$ClientAccessLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ClientAccessLogs.
     * @param {ClientAccessLogCreateManyArgs} args - Arguments to create many ClientAccessLogs.
     * @example
     * // Create many ClientAccessLogs
     * const clientAccessLog = await prisma.clientAccessLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ClientAccessLogCreateManyArgs>(args?: Prisma.SelectSubset<T, ClientAccessLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a ClientAccessLog.
     * @param {ClientAccessLogDeleteArgs} args - Arguments to delete one ClientAccessLog.
     * @example
     * // Delete one ClientAccessLog
     * const ClientAccessLog = await prisma.clientAccessLog.delete({
     *   where: {
     *     // ... filter to delete one ClientAccessLog
     *   }
     * })
     *
     */
    delete<T extends ClientAccessLogDeleteArgs>(args: Prisma.SelectSubset<T, ClientAccessLogDeleteArgs<ExtArgs>>): Prisma.Prisma__ClientAccessLogClient<runtime.Types.Result.GetResult<Prisma.$ClientAccessLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ClientAccessLog.
     * @param {ClientAccessLogUpdateArgs} args - Arguments to update one ClientAccessLog.
     * @example
     * // Update one ClientAccessLog
     * const clientAccessLog = await prisma.clientAccessLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ClientAccessLogUpdateArgs>(args: Prisma.SelectSubset<T, ClientAccessLogUpdateArgs<ExtArgs>>): Prisma.Prisma__ClientAccessLogClient<runtime.Types.Result.GetResult<Prisma.$ClientAccessLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ClientAccessLogs.
     * @param {ClientAccessLogDeleteManyArgs} args - Arguments to filter ClientAccessLogs to delete.
     * @example
     * // Delete a few ClientAccessLogs
     * const { count } = await prisma.clientAccessLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ClientAccessLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, ClientAccessLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ClientAccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAccessLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClientAccessLogs
     * const clientAccessLog = await prisma.clientAccessLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ClientAccessLogUpdateManyArgs>(args: Prisma.SelectSubset<T, ClientAccessLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one ClientAccessLog.
     * @param {ClientAccessLogUpsertArgs} args - Arguments to update or create a ClientAccessLog.
     * @example
     * // Update or create a ClientAccessLog
     * const clientAccessLog = await prisma.clientAccessLog.upsert({
     *   create: {
     *     // ... data to create a ClientAccessLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClientAccessLog we want to update
     *   }
     * })
     */
    upsert<T extends ClientAccessLogUpsertArgs>(args: Prisma.SelectSubset<T, ClientAccessLogUpsertArgs<ExtArgs>>): Prisma.Prisma__ClientAccessLogClient<runtime.Types.Result.GetResult<Prisma.$ClientAccessLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ClientAccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAccessLogCountArgs} args - Arguments to filter ClientAccessLogs to count.
     * @example
     * // Count the number of ClientAccessLogs
     * const count = await prisma.clientAccessLog.count({
     *   where: {
     *     // ... the filter for the ClientAccessLogs we want to count
     *   }
     * })
    **/
    count<T extends ClientAccessLogCountArgs>(args?: Prisma.Subset<T, ClientAccessLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ClientAccessLogCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ClientAccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAccessLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClientAccessLogAggregateArgs>(args: Prisma.Subset<T, ClientAccessLogAggregateArgs>): Prisma.PrismaPromise<GetClientAccessLogAggregateType<T>>;
    /**
     * Group by ClientAccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAccessLogGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ClientAccessLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ClientAccessLogGroupByArgs['orderBy'];
    } : {
        orderBy?: ClientAccessLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ClientAccessLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientAccessLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ClientAccessLog model
     */
    readonly fields: ClientAccessLogFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ClientAccessLog.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ClientAccessLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    client<T extends Prisma.ClientAccessLog$clientArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClientAccessLog$clientArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ClientAccessLog model
 */
export interface ClientAccessLogFieldRefs {
    readonly id: Prisma.FieldRef<"ClientAccessLog", 'String'>;
    readonly clientId: Prisma.FieldRef<"ClientAccessLog", 'String'>;
    readonly usernameAttempted: Prisma.FieldRef<"ClientAccessLog", 'String'>;
    readonly ipAddress: Prisma.FieldRef<"ClientAccessLog", 'String'>;
    readonly hwid: Prisma.FieldRef<"ClientAccessLog", 'String'>;
    readonly action: Prisma.FieldRef<"ClientAccessLog", 'String'>;
    readonly success: Prisma.FieldRef<"ClientAccessLog", 'Boolean'>;
    readonly reason: Prisma.FieldRef<"ClientAccessLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ClientAccessLog", 'DateTime'>;
}
/**
 * ClientAccessLog findUnique
 */
export type ClientAccessLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientAccessLog
     */
    select?: Prisma.ClientAccessLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ClientAccessLog
     */
    omit?: Prisma.ClientAccessLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientAccessLogInclude<ExtArgs> | null;
    /**
     * Filter, which ClientAccessLog to fetch.
     */
    where: Prisma.ClientAccessLogWhereUniqueInput;
};
/**
 * ClientAccessLog findUniqueOrThrow
 */
export type ClientAccessLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientAccessLog
     */
    select?: Prisma.ClientAccessLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ClientAccessLog
     */
    omit?: Prisma.ClientAccessLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientAccessLogInclude<ExtArgs> | null;
    /**
     * Filter, which ClientAccessLog to fetch.
     */
    where: Prisma.ClientAccessLogWhereUniqueInput;
};
/**
 * ClientAccessLog findFirst
 */
export type ClientAccessLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientAccessLog
     */
    select?: Prisma.ClientAccessLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ClientAccessLog
     */
    omit?: Prisma.ClientAccessLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientAccessLogInclude<ExtArgs> | null;
    /**
     * Filter, which ClientAccessLog to fetch.
     */
    where?: Prisma.ClientAccessLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ClientAccessLogs to fetch.
     */
    orderBy?: Prisma.ClientAccessLogOrderByWithRelationInput | Prisma.ClientAccessLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ClientAccessLogs.
     */
    cursor?: Prisma.ClientAccessLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ClientAccessLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ClientAccessLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ClientAccessLogs.
     */
    distinct?: Prisma.ClientAccessLogScalarFieldEnum | Prisma.ClientAccessLogScalarFieldEnum[];
};
/**
 * ClientAccessLog findFirstOrThrow
 */
export type ClientAccessLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientAccessLog
     */
    select?: Prisma.ClientAccessLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ClientAccessLog
     */
    omit?: Prisma.ClientAccessLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientAccessLogInclude<ExtArgs> | null;
    /**
     * Filter, which ClientAccessLog to fetch.
     */
    where?: Prisma.ClientAccessLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ClientAccessLogs to fetch.
     */
    orderBy?: Prisma.ClientAccessLogOrderByWithRelationInput | Prisma.ClientAccessLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ClientAccessLogs.
     */
    cursor?: Prisma.ClientAccessLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ClientAccessLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ClientAccessLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ClientAccessLogs.
     */
    distinct?: Prisma.ClientAccessLogScalarFieldEnum | Prisma.ClientAccessLogScalarFieldEnum[];
};
/**
 * ClientAccessLog findMany
 */
export type ClientAccessLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientAccessLog
     */
    select?: Prisma.ClientAccessLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ClientAccessLog
     */
    omit?: Prisma.ClientAccessLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientAccessLogInclude<ExtArgs> | null;
    /**
     * Filter, which ClientAccessLogs to fetch.
     */
    where?: Prisma.ClientAccessLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ClientAccessLogs to fetch.
     */
    orderBy?: Prisma.ClientAccessLogOrderByWithRelationInput | Prisma.ClientAccessLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ClientAccessLogs.
     */
    cursor?: Prisma.ClientAccessLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ClientAccessLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ClientAccessLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ClientAccessLogs.
     */
    distinct?: Prisma.ClientAccessLogScalarFieldEnum | Prisma.ClientAccessLogScalarFieldEnum[];
};
/**
 * ClientAccessLog create
 */
export type ClientAccessLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientAccessLog
     */
    select?: Prisma.ClientAccessLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ClientAccessLog
     */
    omit?: Prisma.ClientAccessLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientAccessLogInclude<ExtArgs> | null;
    /**
     * The data needed to create a ClientAccessLog.
     */
    data: Prisma.XOR<Prisma.ClientAccessLogCreateInput, Prisma.ClientAccessLogUncheckedCreateInput>;
};
/**
 * ClientAccessLog createMany
 */
export type ClientAccessLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClientAccessLogs.
     */
    data: Prisma.ClientAccessLogCreateManyInput | Prisma.ClientAccessLogCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ClientAccessLog update
 */
export type ClientAccessLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientAccessLog
     */
    select?: Prisma.ClientAccessLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ClientAccessLog
     */
    omit?: Prisma.ClientAccessLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientAccessLogInclude<ExtArgs> | null;
    /**
     * The data needed to update a ClientAccessLog.
     */
    data: Prisma.XOR<Prisma.ClientAccessLogUpdateInput, Prisma.ClientAccessLogUncheckedUpdateInput>;
    /**
     * Choose, which ClientAccessLog to update.
     */
    where: Prisma.ClientAccessLogWhereUniqueInput;
};
/**
 * ClientAccessLog updateMany
 */
export type ClientAccessLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ClientAccessLogs.
     */
    data: Prisma.XOR<Prisma.ClientAccessLogUpdateManyMutationInput, Prisma.ClientAccessLogUncheckedUpdateManyInput>;
    /**
     * Filter which ClientAccessLogs to update
     */
    where?: Prisma.ClientAccessLogWhereInput;
    /**
     * Limit how many ClientAccessLogs to update.
     */
    limit?: number;
};
/**
 * ClientAccessLog upsert
 */
export type ClientAccessLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientAccessLog
     */
    select?: Prisma.ClientAccessLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ClientAccessLog
     */
    omit?: Prisma.ClientAccessLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientAccessLogInclude<ExtArgs> | null;
    /**
     * The filter to search for the ClientAccessLog to update in case it exists.
     */
    where: Prisma.ClientAccessLogWhereUniqueInput;
    /**
     * In case the ClientAccessLog found by the `where` argument doesn't exist, create a new ClientAccessLog with this data.
     */
    create: Prisma.XOR<Prisma.ClientAccessLogCreateInput, Prisma.ClientAccessLogUncheckedCreateInput>;
    /**
     * In case the ClientAccessLog was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ClientAccessLogUpdateInput, Prisma.ClientAccessLogUncheckedUpdateInput>;
};
/**
 * ClientAccessLog delete
 */
export type ClientAccessLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientAccessLog
     */
    select?: Prisma.ClientAccessLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ClientAccessLog
     */
    omit?: Prisma.ClientAccessLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientAccessLogInclude<ExtArgs> | null;
    /**
     * Filter which ClientAccessLog to delete.
     */
    where: Prisma.ClientAccessLogWhereUniqueInput;
};
/**
 * ClientAccessLog deleteMany
 */
export type ClientAccessLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ClientAccessLogs to delete
     */
    where?: Prisma.ClientAccessLogWhereInput;
    /**
     * Limit how many ClientAccessLogs to delete.
     */
    limit?: number;
};
/**
 * ClientAccessLog.client
 */
export type ClientAccessLog$clientArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * ClientAccessLog without action
 */
export type ClientAccessLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientAccessLog
     */
    select?: Prisma.ClientAccessLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ClientAccessLog
     */
    omit?: Prisma.ClientAccessLogOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ClientAccessLogInclude<ExtArgs> | null;
};
