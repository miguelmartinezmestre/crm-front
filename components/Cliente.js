import { gql, useMutation } from "@apollo/client";
import Router from "next/router";
import Swal from "sweetalert2";

const eliminar = gql`
  mutation Mutation($id: ID!) {
    eliminarCliente(id: $id)
  }
`;

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

export default function Cliente({ cliente }) {
  const [eliminarCliente] = useMutation(eliminar, {
    update(cache) {
      const { obtenerClientesVendedor } = cache.readQuery({
        query: obtenerClientes,
      });

      cache.writeQuery({
        query: obtenerClientes,
        data: {
          obtenerClientesVendedor: obtenerClientesVendedor.filter(
            (clienteActual) => clienteActual.id != cliente.id
          ),
        },
      });
    },
  });

  const confirmar = async (id) => {
    Swal.fire({
      title: "",
      text: "Esta operacion es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.value) {
        try {
          const { data } = await eliminarCliente({
            variables: {
              id,
            },
          });

          Swal.fire("Eliminado!", data.eliminarCliente, "success");
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  const editarCliente = (id) => {
    Router.push({
      pathname: "/editarcliente/[id]",
      query: { id },
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        {cliente.nombre}-{cliente.apellido}
      </td>
      <td className="border px-4 py-2">{cliente.empresa}</td>
      <td className="border px-4 py-2">{cliente.email}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => {
            confirmar(cliente.id);
          }}
        >
          Eliminar
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => {
            editarCliente(cliente.id);
          }}
        >
          Editar
        </button>
      </td>
    </tr>
  );
}
