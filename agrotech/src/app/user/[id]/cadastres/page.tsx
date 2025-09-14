"use client";

import React, { use } from "react";
import { useSession } from "next-auth/react";
import type { Cadastru } from "@/api/apiSchemas";
import { useGetCadastru } from "@/api/apiComponents";
import LoadingElement from "@/components/ui/loading-circle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CadastresList from "@/components/ui/cadastres-list";

const CadastruGrid = ({ cadastruData }: { cadastruData: Array<Cadastru> }) => (
  <Card>
    <CardHeader>
      <CardTitle>My Cadastres</CardTitle>
    </CardHeader>
    <CardContent>
      <CadastresList data={cadastruData} type="Cadastru" />
    </CardContent>
  </Card>
);

const AccountPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const { data, isLoading, isError } = useGetCadastru({
    pathParams: { id: resolvedParams.id },
  });

  if (isLoading) {
    return <LoadingElement />;
  }

  if (isError) {
    return <div>ERROR</div>;
  }

  return (
    <div>
      <CadastruGrid cadastruData={data!} />
    </div>
  );
};

export default AccountPage;
