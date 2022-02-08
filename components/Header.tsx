import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { client } from "../Apollo";

const usuario = gql`
  query ObtenerUsuario {
    obtenerUsuario {
      nombre
    }
  }
`;

const Header = () => {
  const { data, loading, error } = useQuery(usuario);
  const router = useRouter();

  function cerrarSesion():void {
    localStorage.removeItem("token");
    client.clearStore();
    router.push("/login");
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex justify-end">
      <p className="mr-2">Hola {data.obtenerUsuario.nombre}</p>

      <button
        type="button"
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        onClick={() => {
          cerrarSesion();
        }}
      >
        Cerrar Sesion
      </button>
    </div>
  );
};

export default Header;
