"use client";

import React, { use } from "react";
import { useSession } from "next-auth/react";
import type { Cadastru } from "@/api/apiSchemas";
import { useGetCadastru } from "@/api/apiComponents";
import LoadingElement from "@/components/ui/loading-circle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CadastresList from "@/components/ui/cadastres-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const CadastruGrid = ({ cadastruData }: { cadastruData: Array<Cadastru> }) => (
  <Card>
    <CardHeader>
      <CardTitle>Cadastre Records</CardTitle>
    </CardHeader>
    <CardContent>
      <CadastresList data={cadastruData} type="Cadastru" />
    </CardContent>
  </Card>
);

const Profile = ({ session }: { session: any }) => {
  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-24 w-24 border">
        <AvatarImage
          src={
            "https://www.shutterstock.com/image-vector/mother-earth-day-woman-hugging-600w-2598812541.jpg"
          }
          alt={session.user.name}
        />
        <AvatarFallback>{session.user.name}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {session.user.name}
        </h2>
        <p className="text-sm text-gray-600">{session.user.email}</p>
        <Badge className="mt-2" variant="secondary">
          {session.user.name}
        </Badge>
      </div>
      <button className="rounded-md border border-black bg-white px-4 py-2 text-sm text-black transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
        <Link href={"/projects"}>Check for grants</Link>
      </button>
      <button className="rounded-md border border-black bg-white px-4 py-2 text-sm text-black transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
        <Link href={"/projects"}>Buy insurance</Link>
      </button>
      <button className="rounded-md border border-black bg-white px-4 py-2 text-sm text-black transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
        Prediction {"(Premium)"}
      </button>
      <button className="rounded-md border border-black bg-white px-4 py-2 text-sm text-black transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)]">
        Calculate profitability {"(Premium)"}
      </button>
    </div>
  );
};

const AccountPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const { data, isLoading, isError } = useGetCadastru({
    pathParams: { id: resolvedParams.id },
  });
  const { data: session, status } = useSession();
  if (isLoading) {
    return <LoadingElement />;
  }

  if (isError) {
    return <div>ERROR</div>;
  }

  return (
    <div>
      <Profile session={session} />
      <CadastruGrid cadastruData={data!} />
    </div>
  );
};

export default AccountPage;
