'use client'

import { useGetCadastres } from "@/api/apiComponents";
import CadastresList from "@/components/ui/cadastres-list";
import LoadingElement from "@/components/ui/loading-circle";
import { WorldMapDemo } from "@/components/WorldMap";
import { useSession } from "next-auth/react";
import { use } from "react";

const CadastresPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const { data, isLoading, isError } = useGetCadastres({});
  const { data: session, status } = useSession();

  if (isLoading) {
    return <LoadingElement />;
  }

  if (isError) {
    return <div>ERROR</div>;
  }

  return (
    <div>
      <WorldMapDemo/>
      <CadastresList data={data!} type={"Cadastru"} />
    </div>
  );
};

export default CadastresPage;
