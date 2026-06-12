import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Client
 * Usuário final do cheat (cadastro com key no menu interno)
 */
export type ClientModel = runtime.Types.Result.DefaultSelection<Prisma.$ClientPayload>;
export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null;
    _avg: ClientAvgAggregateOutputType | null;
    _sum: ClientSumAggregateOutputType | null;
    _min: ClientMinAggregateOutputType | null;
    _max: ClientMaxAggregateOutputType | null;
};
export type ClientAvgAggregateOutputType = {
    loginCount: number | null;
};
export type ClientSumAggregateOutputType = {
    loginCount: number | null;
};
export type ClientMinAggregateOutputType = {
    id: string | null;
    username: string | null;
    passwordHash: string | null;
    hwid: string | null;
    discordId: string | null;
    isBanned: boolean | null;
    expiresAt: Date | null;
    loginCount: number | null;
    lastLoginAt: Date | null;
    createdAt: Date | null;
    keyId: string | null;
};
export type ClientMaxAggregateOutputType = {
    id: string | null;
    username: string | null;
    passwordHash: string | null;
    hwid: string | null;
    discordId: string | null;
    isBanned: boolean | null;
    expiresAt: Date | null;
    loginCount: number | null;
    lastLoginAt: Date | null;
    createdAt: Date | null;
    keyId: string | null;
};
export type ClientCountAggregateOutputType = {
    id: number;
    username: number;
    passwordHash: number;
    hwid: number;
    discordId: number;
    isBanned: number;
    expiresAt: number;
    loginCount: number;
    lastLoginAt: number;
    createdAt: number;
    keyId: number;
    _all: number;
};
export type ClientAvgAggregateInputType = {
    loginCount?: true;
};
export type ClientSumAggregateInputType = {
    loginCount?: true;
};
export type ClientMinAggregateInputType = {
    id?: true;
    username?: true;
    passwordHash?: true;
    hwid?: true;
    discordId?: true;
    isBanned?: true;
    expiresAt?: true;
    loginCount?: true;
    lastLoginAt?: true;
    createdAt?: true;
    keyId?: true;
};
export type ClientMaxAggregateInputType = {
    id?: true;
    username?: true;
    passwordHash?: true;
    hwid?: true;
    discordId?: true;
    isBanned?: true;
    expiresAt?: true;
    loginCount?: true;
    lastLoginAt?: true;
    createdAt?: true;
    keyId?: true;
};
export type ClientCountAggregateInputType = {
    id?: true;
    username?: true;
    passwordHash?: true;
    hwid?: true;
    discordId?: true;
    isBanned?: true;
    expiresAt?: true;
    loginCount?: true;
    lastLoginAt?: true;
    createdAt?: true;
    keyId?: true;
    _all?: true;
};
export type ClientAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: Prisma.ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: Prisma.ClientOrderByWithRelationInput | Prisma.ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ClientAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ClientSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType;
};
export type GetClientAggregateType<T extends ClientAggregateArgs> = {
    [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateClient[P]> : Prisma.GetScalarType<T[P], AggregateClient[P]>;
};
export type ClientGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClientWhereInput;
    orderBy?: Prisma.ClientOrderByWithAggregationInput | Prisma.ClientOrderByWithAggregationInput[];
    by: Prisma.ClientScalarFieldEnum[] | Prisma.ClientScalarFieldEnum;
    having?: Prisma.ClientScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClientCountAggregateInputType | true;
    _avg?: ClientAvgAggregateInputType;
    _sum?: ClientSumAggregateInputType;
    _min?: ClientMinAggregateInputType;
    _max?: ClientMaxAggregateInputType;
};
export type ClientGroupByOutputType = {
    id: string;
    username: string;
    passwordHash: string;
    hwid: string | null;
    discordId: string | null;
    isBanned: boolean;
    expiresAt: Date;
    loginCount: number;
    lastLoginAt: Date | null;
    createdAt: Date;
    keyId: string;
    _count: ClientCountAggregateOutputType | null;
    _avg: ClientAvgAggregateOutputType | null;
    _sum: ClientSumAggregateOutputType | null;
    _min: ClientMinAggregateOutputType | null;
    _max: ClientMaxAggregateOutputType | null;
};
export type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ClientGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ClientGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ClientGroupByOutputType[P]>;
}>>;
export type ClientWhereInput = {
    AND?: Prisma.ClientWhereInput | Prisma.ClientWhereInput[];
    OR?: Prisma.ClientWhereInput[];
    NOT?: Prisma.ClientWhereInput | Prisma.ClientWhereInput[];
    id?: Prisma.StringFilter<"Client"> | string;
    username?: Prisma.StringFilter<"Client"> | string;
    passwordHash?: Prisma.StringFilter<"Client"> | string;
    hwid?: Prisma.StringNullableFilter<"Client"> | string | null;
    discordId?: Prisma.StringNullableFilter<"Client"> | string | null;
    isBanned?: Prisma.BoolFilter<"Client"> | boolean;
    expiresAt?: Prisma.DateTimeFilter<"Client"> | Date | string;
    loginCount?: Prisma.IntFilter<"Client"> | number;
    lastLoginAt?: Prisma.DateTimeNullableFilter<"Client"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Client"> | Date | string;
    keyId?: Prisma.StringFilter<"Client"> | string;
    key?: Prisma.XOR<Prisma.KeyScalarRelationFilter, Prisma.KeyWhereInput>;
    accessLogs?: Prisma.ClientAccessLogListRelationFilter;
};
export type ClientOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    hwid?: Prisma.SortOrderInput | Prisma.SortOrder;
    discordId?: Prisma.SortOrderInput | Prisma.SortOrder;
    isBanned?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    loginCount?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    keyId?: Prisma.SortOrder;
    key?: Prisma.KeyOrderByWithRelationInput;
    accessLogs?: Prisma.ClientAccessLogOrderByRelationAggregateInput;
    _relevance?: Prisma.ClientOrderByRelevanceInput;
};
export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    username?: string;
    keyId?: string;
    AND?: Prisma.ClientWhereInput | Prisma.ClientWhereInput[];
    OR?: Prisma.ClientWhereInput[];
    NOT?: Prisma.ClientWhereInput | Prisma.ClientWhereInput[];
    passwordHash?: Prisma.StringFilter<"Client"> | string;
    hwid?: Prisma.StringNullableFilter<"Client"> | string | null;
    discordId?: Prisma.StringNullableFilter<"Client"> | string | null;
    isBanned?: Prisma.BoolFilter<"Client"> | boolean;
    expiresAt?: Prisma.DateTimeFilter<"Client"> | Date | string;
    loginCount?: Prisma.IntFilter<"Client"> | number;
    lastLoginAt?: Prisma.DateTimeNullableFilter<"Client"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Client"> | Date | string;
    key?: Prisma.XOR<Prisma.KeyScalarRelationFilter, Prisma.KeyWhereInput>;
    accessLogs?: Prisma.ClientAccessLogListRelationFilter;
}, "id" | "username" | "keyId">;
export type ClientOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    hwid?: Prisma.SortOrderInput | Prisma.SortOrder;
    discordId?: Prisma.SortOrderInput | Prisma.SortOrder;
    isBanned?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    loginCount?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    keyId?: Prisma.SortOrder;
    _count?: Prisma.ClientCountOrderByAggregateInput;
    _avg?: Prisma.ClientAvgOrderByAggregateInput;
    _max?: Prisma.ClientMaxOrderByAggregateInput;
    _min?: Prisma.ClientMinOrderByAggregateInput;
    _sum?: Prisma.ClientSumOrderByAggregateInput;
};
export type ClientScalarWhereWithAggregatesInput = {
    AND?: Prisma.ClientScalarWhereWithAggregatesInput | Prisma.ClientScalarWhereWithAggregatesInput[];
    OR?: Prisma.ClientScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ClientScalarWhereWithAggregatesInput | Prisma.ClientScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Client"> | string;
    username?: Prisma.StringWithAggregatesFilter<"Client"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"Client"> | string;
    hwid?: Prisma.StringNullableWithAggregatesFilter<"Client"> | string | null;
    discordId?: Prisma.StringNullableWithAggregatesFilter<"Client"> | string | null;
    isBanned?: Prisma.BoolWithAggregatesFilter<"Client"> | boolean;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"Client"> | Date | string;
    loginCount?: Prisma.IntWithAggregatesFilter<"Client"> | number;
    lastLoginAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Client"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Client"> | Date | string;
    keyId?: Prisma.StringWithAggregatesFilter<"Client"> | string;
};
export type ClientCreateInput = {
    id?: string;
    username: string;
    passwordHash: string;
    hwid?: string | null;
    discordId?: string | null;
    isBanned?: boolean;
    expiresAt: Date | string;
    loginCount?: number;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    key: Prisma.KeyCreateNestedOneWithoutClientInput;
    accessLogs?: Prisma.ClientAccessLogCreateNestedManyWithoutClientInput;
};
export type ClientUncheckedCreateInput = {
    id?: string;
    username: string;
    passwordHash: string;
    hwid?: string | null;
    discordId?: string | null;
    isBanned?: boolean;
    expiresAt: Date | string;
    loginCount?: number;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    keyId: string;
    accessLogs?: Prisma.ClientAccessLogUncheckedCreateNestedManyWithoutClientInput;
};
export type ClientUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBanned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loginCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    key?: Prisma.KeyUpdateOneRequiredWithoutClientNestedInput;
    accessLogs?: Prisma.ClientAccessLogUpdateManyWithoutClientNestedInput;
};
export type ClientUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBanned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loginCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    keyId?: Prisma.StringFieldUpdateOperationsInput | string;
    accessLogs?: Prisma.ClientAccessLogUncheckedUpdateManyWithoutClientNestedInput;
};
export type ClientCreateManyInput = {
    id?: string;
    username: string;
    passwordHash: string;
    hwid?: string | null;
    discordId?: string | null;
    isBanned?: boolean;
    expiresAt: Date | string;
    loginCount?: number;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    keyId: string;
};
export type ClientUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBanned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loginCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ClientUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBanned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loginCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    keyId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ClientNullableScalarRelationFilter = {
    is?: Prisma.ClientWhereInput | null;
    isNot?: Prisma.ClientWhereInput | null;
};
export type ClientOrderByRelevanceInput = {
    fields: Prisma.ClientOrderByRelevanceFieldEnum | Prisma.ClientOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type ClientCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    hwid?: Prisma.SortOrder;
    discordId?: Prisma.SortOrder;
    isBanned?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    loginCount?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    keyId?: Prisma.SortOrder;
};
export type ClientAvgOrderByAggregateInput = {
    loginCount?: Prisma.SortOrder;
};
export type ClientMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    hwid?: Prisma.SortOrder;
    discordId?: Prisma.SortOrder;
    isBanned?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    loginCount?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    keyId?: Prisma.SortOrder;
};
export type ClientMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    username?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    hwid?: Prisma.SortOrder;
    discordId?: Prisma.SortOrder;
    isBanned?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    loginCount?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    keyId?: Prisma.SortOrder;
};
export type ClientSumOrderByAggregateInput = {
    loginCount?: Prisma.SortOrder;
};
export type ClientCreateNestedOneWithoutKeyInput = {
    create?: Prisma.XOR<Prisma.ClientCreateWithoutKeyInput, Prisma.ClientUncheckedCreateWithoutKeyInput>;
    connectOrCreate?: Prisma.ClientCreateOrConnectWithoutKeyInput;
    connect?: Prisma.ClientWhereUniqueInput;
};
export type ClientUncheckedCreateNestedOneWithoutKeyInput = {
    create?: Prisma.XOR<Prisma.ClientCreateWithoutKeyInput, Prisma.ClientUncheckedCreateWithoutKeyInput>;
    connectOrCreate?: Prisma.ClientCreateOrConnectWithoutKeyInput;
    connect?: Prisma.ClientWhereUniqueInput;
};
export type ClientUpdateOneWithoutKeyNestedInput = {
    create?: Prisma.XOR<Prisma.ClientCreateWithoutKeyInput, Prisma.ClientUncheckedCreateWithoutKeyInput>;
    connectOrCreate?: Prisma.ClientCreateOrConnectWithoutKeyInput;
    upsert?: Prisma.ClientUpsertWithoutKeyInput;
    disconnect?: Prisma.ClientWhereInput | boolean;
    delete?: Prisma.ClientWhereInput | boolean;
    connect?: Prisma.ClientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClientUpdateToOneWithWhereWithoutKeyInput, Prisma.ClientUpdateWithoutKeyInput>, Prisma.ClientUncheckedUpdateWithoutKeyInput>;
};
export type ClientUncheckedUpdateOneWithoutKeyNestedInput = {
    create?: Prisma.XOR<Prisma.ClientCreateWithoutKeyInput, Prisma.ClientUncheckedCreateWithoutKeyInput>;
    connectOrCreate?: Prisma.ClientCreateOrConnectWithoutKeyInput;
    upsert?: Prisma.ClientUpsertWithoutKeyInput;
    disconnect?: Prisma.ClientWhereInput | boolean;
    delete?: Prisma.ClientWhereInput | boolean;
    connect?: Prisma.ClientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClientUpdateToOneWithWhereWithoutKeyInput, Prisma.ClientUpdateWithoutKeyInput>, Prisma.ClientUncheckedUpdateWithoutKeyInput>;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ClientCreateNestedOneWithoutAccessLogsInput = {
    create?: Prisma.XOR<Prisma.ClientCreateWithoutAccessLogsInput, Prisma.ClientUncheckedCreateWithoutAccessLogsInput>;
    connectOrCreate?: Prisma.ClientCreateOrConnectWithoutAccessLogsInput;
    connect?: Prisma.ClientWhereUniqueInput;
};
export type ClientUpdateOneWithoutAccessLogsNestedInput = {
    create?: Prisma.XOR<Prisma.ClientCreateWithoutAccessLogsInput, Prisma.ClientUncheckedCreateWithoutAccessLogsInput>;
    connectOrCreate?: Prisma.ClientCreateOrConnectWithoutAccessLogsInput;
    upsert?: Prisma.ClientUpsertWithoutAccessLogsInput;
    disconnect?: Prisma.ClientWhereInput | boolean;
    delete?: Prisma.ClientWhereInput | boolean;
    connect?: Prisma.ClientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ClientUpdateToOneWithWhereWithoutAccessLogsInput, Prisma.ClientUpdateWithoutAccessLogsInput>, Prisma.ClientUncheckedUpdateWithoutAccessLogsInput>;
};
export type ClientCreateWithoutKeyInput = {
    id?: string;
    username: string;
    passwordHash: string;
    hwid?: string | null;
    discordId?: string | null;
    isBanned?: boolean;
    expiresAt: Date | string;
    loginCount?: number;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    accessLogs?: Prisma.ClientAccessLogCreateNestedManyWithoutClientInput;
};
export type ClientUncheckedCreateWithoutKeyInput = {
    id?: string;
    username: string;
    passwordHash: string;
    hwid?: string | null;
    discordId?: string | null;
    isBanned?: boolean;
    expiresAt: Date | string;
    loginCount?: number;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    accessLogs?: Prisma.ClientAccessLogUncheckedCreateNestedManyWithoutClientInput;
};
export type ClientCreateOrConnectWithoutKeyInput = {
    where: Prisma.ClientWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClientCreateWithoutKeyInput, Prisma.ClientUncheckedCreateWithoutKeyInput>;
};
export type ClientUpsertWithoutKeyInput = {
    update: Prisma.XOR<Prisma.ClientUpdateWithoutKeyInput, Prisma.ClientUncheckedUpdateWithoutKeyInput>;
    create: Prisma.XOR<Prisma.ClientCreateWithoutKeyInput, Prisma.ClientUncheckedCreateWithoutKeyInput>;
    where?: Prisma.ClientWhereInput;
};
export type ClientUpdateToOneWithWhereWithoutKeyInput = {
    where?: Prisma.ClientWhereInput;
    data: Prisma.XOR<Prisma.ClientUpdateWithoutKeyInput, Prisma.ClientUncheckedUpdateWithoutKeyInput>;
};
export type ClientUpdateWithoutKeyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBanned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loginCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accessLogs?: Prisma.ClientAccessLogUpdateManyWithoutClientNestedInput;
};
export type ClientUncheckedUpdateWithoutKeyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBanned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loginCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    accessLogs?: Prisma.ClientAccessLogUncheckedUpdateManyWithoutClientNestedInput;
};
export type ClientCreateWithoutAccessLogsInput = {
    id?: string;
    username: string;
    passwordHash: string;
    hwid?: string | null;
    discordId?: string | null;
    isBanned?: boolean;
    expiresAt: Date | string;
    loginCount?: number;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    key: Prisma.KeyCreateNestedOneWithoutClientInput;
};
export type ClientUncheckedCreateWithoutAccessLogsInput = {
    id?: string;
    username: string;
    passwordHash: string;
    hwid?: string | null;
    discordId?: string | null;
    isBanned?: boolean;
    expiresAt: Date | string;
    loginCount?: number;
    lastLoginAt?: Date | string | null;
    createdAt?: Date | string;
    keyId: string;
};
export type ClientCreateOrConnectWithoutAccessLogsInput = {
    where: Prisma.ClientWhereUniqueInput;
    create: Prisma.XOR<Prisma.ClientCreateWithoutAccessLogsInput, Prisma.ClientUncheckedCreateWithoutAccessLogsInput>;
};
export type ClientUpsertWithoutAccessLogsInput = {
    update: Prisma.XOR<Prisma.ClientUpdateWithoutAccessLogsInput, Prisma.ClientUncheckedUpdateWithoutAccessLogsInput>;
    create: Prisma.XOR<Prisma.ClientCreateWithoutAccessLogsInput, Prisma.ClientUncheckedCreateWithoutAccessLogsInput>;
    where?: Prisma.ClientWhereInput;
};
export type ClientUpdateToOneWithWhereWithoutAccessLogsInput = {
    where?: Prisma.ClientWhereInput;
    data: Prisma.XOR<Prisma.ClientUpdateWithoutAccessLogsInput, Prisma.ClientUncheckedUpdateWithoutAccessLogsInput>;
};
export type ClientUpdateWithoutAccessLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBanned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loginCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    key?: Prisma.KeyUpdateOneRequiredWithoutClientNestedInput;
};
export type ClientUncheckedUpdateWithoutAccessLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    username?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    hwid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discordId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isBanned?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    loginCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    keyId?: Prisma.StringFieldUpdateOperationsInput | string;
};
/**
 * Count Type ClientCountOutputType
 */
export type ClientCountOutputType = {
    accessLogs: number;
};
export type ClientCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    accessLogs?: boolean | ClientCountOutputTypeCountAccessLogsArgs;
};
/**
 * ClientCountOutputType without action
 */
export type ClientCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: Prisma.ClientCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ClientCountOutputType without action
 */
export type ClientCountOutputTypeCountAccessLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ClientAccessLogWhereInput;
};
export type ClientSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    hwid?: boolean;
    discordId?: boolean;
    isBanned?: boolean;
    expiresAt?: boolean;
    loginCount?: boolean;
    lastLoginAt?: boolean;
    createdAt?: boolean;
    keyId?: boolean;
    key?: boolean | Prisma.KeyDefaultArgs<ExtArgs>;
    accessLogs?: boolean | Prisma.Client$accessLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.ClientCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["client"]>;
export type ClientSelectScalar = {
    id?: boolean;
    username?: boolean;
    passwordHash?: boolean;
    hwid?: boolean;
    discordId?: boolean;
    isBanned?: boolean;
    expiresAt?: boolean;
    loginCount?: boolean;
    lastLoginAt?: boolean;
    createdAt?: boolean;
    keyId?: boolean;
};
export type ClientOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "username" | "passwordHash" | "hwid" | "discordId" | "isBanned" | "expiresAt" | "loginCount" | "lastLoginAt" | "createdAt" | "keyId", ExtArgs["result"]["client"]>;
export type ClientInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    key?: boolean | Prisma.KeyDefaultArgs<ExtArgs>;
    accessLogs?: boolean | Prisma.Client$accessLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.ClientCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $ClientPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Client";
    objects: {
        key: Prisma.$KeyPayload<ExtArgs>;
        accessLogs: Prisma.$ClientAccessLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        username: string;
        passwordHash: string;
        hwid: string | null;
        discordId: string | null;
        isBanned: boolean;
        expiresAt: Date;
        loginCount: number;
        lastLoginAt: Date | null;
        createdAt: Date;
        keyId: string;
    }, ExtArgs["result"]["client"]>;
    composites: {};
};
export type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ClientPayload, S>;
export type ClientCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ClientCountAggregateInputType | true;
};
export interface ClientDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Client'];
        meta: {
            name: 'Client';
        };
    };
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: Prisma.SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: Prisma.SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     *
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ClientFindManyArgs>(args?: Prisma.SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     *
     */
    create<T extends ClientCreateArgs>(args: Prisma.SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ClientCreateManyArgs>(args?: Prisma.SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     *
     */
    delete<T extends ClientDeleteArgs>(args: Prisma.SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ClientUpdateArgs>(args: Prisma.SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: Prisma.SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ClientUpdateManyArgs>(args: Prisma.SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: Prisma.SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma.Prisma__ClientClient<runtime.Types.Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(args?: Prisma.Subset<T, ClientCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ClientCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClientAggregateArgs>(args: Prisma.Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>;
    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ClientGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ClientGroupByArgs['orderBy'];
    } : {
        orderBy?: ClientGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Client model
     */
    readonly fields: ClientFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Client.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ClientClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    key<T extends Prisma.KeyDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.KeyDefaultArgs<ExtArgs>>): Prisma.Prisma__KeyClient<runtime.Types.Result.GetResult<Prisma.$KeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    accessLogs<T extends Prisma.Client$accessLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Client$accessLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ClientAccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Client model
 */
export interface ClientFieldRefs {
    readonly id: Prisma.FieldRef<"Client", 'String'>;
    readonly username: Prisma.FieldRef<"Client", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"Client", 'String'>;
    readonly hwid: Prisma.FieldRef<"Client", 'String'>;
    readonly discordId: Prisma.FieldRef<"Client", 'String'>;
    readonly isBanned: Prisma.FieldRef<"Client", 'Boolean'>;
    readonly expiresAt: Prisma.FieldRef<"Client", 'DateTime'>;
    readonly loginCount: Prisma.FieldRef<"Client", 'Int'>;
    readonly lastLoginAt: Prisma.FieldRef<"Client", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Client", 'DateTime'>;
    readonly keyId: Prisma.FieldRef<"Client", 'String'>;
}
/**
 * Client findUnique
 */
export type ClientFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Client to fetch.
     */
    where: Prisma.ClientWhereUniqueInput;
};
/**
 * Client findUniqueOrThrow
 */
export type ClientFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Client to fetch.
     */
    where: Prisma.ClientWhereUniqueInput;
};
/**
 * Client findFirst
 */
export type ClientFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Client to fetch.
     */
    where?: Prisma.ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: Prisma.ClientOrderByWithRelationInput | Prisma.ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Clients.
     */
    cursor?: Prisma.ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Clients.
     */
    distinct?: Prisma.ClientScalarFieldEnum | Prisma.ClientScalarFieldEnum[];
};
/**
 * Client findFirstOrThrow
 */
export type ClientFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Client to fetch.
     */
    where?: Prisma.ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: Prisma.ClientOrderByWithRelationInput | Prisma.ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Clients.
     */
    cursor?: Prisma.ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Clients.
     */
    distinct?: Prisma.ClientScalarFieldEnum | Prisma.ClientScalarFieldEnum[];
};
/**
 * Client findMany
 */
export type ClientFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Clients to fetch.
     */
    where?: Prisma.ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: Prisma.ClientOrderByWithRelationInput | Prisma.ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Clients.
     */
    cursor?: Prisma.ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Clients.
     */
    distinct?: Prisma.ClientScalarFieldEnum | Prisma.ClientScalarFieldEnum[];
};
/**
 * Client create
 */
export type ClientCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Client.
     */
    data: Prisma.XOR<Prisma.ClientCreateInput, Prisma.ClientUncheckedCreateInput>;
};
/**
 * Client createMany
 */
export type ClientCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: Prisma.ClientCreateManyInput | Prisma.ClientCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Client update
 */
export type ClientUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Client.
     */
    data: Prisma.XOR<Prisma.ClientUpdateInput, Prisma.ClientUncheckedUpdateInput>;
    /**
     * Choose, which Client to update.
     */
    where: Prisma.ClientWhereUniqueInput;
};
/**
 * Client updateMany
 */
export type ClientUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: Prisma.XOR<Prisma.ClientUpdateManyMutationInput, Prisma.ClientUncheckedUpdateManyInput>;
    /**
     * Filter which Clients to update
     */
    where?: Prisma.ClientWhereInput;
    /**
     * Limit how many Clients to update.
     */
    limit?: number;
};
/**
 * Client upsert
 */
export type ClientUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: Prisma.ClientWhereUniqueInput;
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: Prisma.XOR<Prisma.ClientCreateInput, Prisma.ClientUncheckedCreateInput>;
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ClientUpdateInput, Prisma.ClientUncheckedUpdateInput>;
};
/**
 * Client delete
 */
export type ClientDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Client to delete.
     */
    where: Prisma.ClientWhereUniqueInput;
};
/**
 * Client deleteMany
 */
export type ClientDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: Prisma.ClientWhereInput;
    /**
     * Limit how many Clients to delete.
     */
    limit?: number;
};
/**
 * Client.accessLogs
 */
export type Client$accessLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.ClientAccessLogWhereInput;
    orderBy?: Prisma.ClientAccessLogOrderByWithRelationInput | Prisma.ClientAccessLogOrderByWithRelationInput[];
    cursor?: Prisma.ClientAccessLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ClientAccessLogScalarFieldEnum | Prisma.ClientAccessLogScalarFieldEnum[];
};
/**
 * Client without action
 */
export type ClientDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
