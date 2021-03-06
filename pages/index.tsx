import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import Cliente from "../components/Cliente";
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
export default function Index(){
  const { data, loading } = useQuery(obtenerClientes);
  const router = useRouter();
  if (loading) return "Cargando...";
  if (!localStorage.getItem("token")){router.push("/login");return <div>Cargando...</div>}
    return (
      <div>
        <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Desde clientes</h1>

          <Link href="/nuevocliente">
            <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white arounded text-sm hover:bg-gray-800 mb-3 uppercase">
              {" "}
              nuevo cliente
            </a>
          </Link>

          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Nombre y Apellido</th>
                <th className="w-1/5 py-2">Empresa</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2">Eliminar</th>
                <th className="w-1/5 py-2">Editar</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.obtenerClientesVendedor.map((cliente) => (
                <Cliente key={cliente.id} cliente={cliente} />
              ))}
            </tbody>
          </table>
        </Layout>
      </div>
    );
  }