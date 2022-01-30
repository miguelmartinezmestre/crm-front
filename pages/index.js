import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const obtenerClientes = gql`
  query getClientes {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
      telefono
      vendedor
    }
  }
`;

export default function Index() {
  const { data, loading } = useQuery(obtenerClientes);
  const router = useRouter();

  if (loading) return "Cargando...";

  if(!data.obtenerClientesVendedor){
    router.push("/login");
    return null;
  }else{
    return (
      <div>
        <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Desde clientes</h1>
  
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Nombre</th>
                <th className="w-1/5 py-2">Empresa</th>
                <th className="w-1/5 py-2">Email</th>
              </tr>
            </thead>
  
            <tbody className="bg-white">
              {data.obtenerClientesVendedor.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="border px-4 py-2">
                    {cliente.nombre} {cliente.apellido}
                  </td>
                  <td className="border px-4 py-2">{cliente.empresa}</td>
                  <td className="border px-4 py-2">{cliente.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Layout>
      </div>
    );
  }
}
