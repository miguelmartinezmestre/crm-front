import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Formik } from "formik";
import * as Yup from "yup";

const obtenerCliente = gql`
  query Query($id: ID) {
    obtenerCliente(id: $id) {
      nombre
      apellido
      empresa
      email
      telefono
      vendedor
    }
  }
`;

const actualizar = gql`
mutation Mutation($id: ID!, $input: ClienteInput) {
  actualizarCliente(id: $id, input: $input) {
    nombre
    apellido
    empresa
    email
    telefono
    vendedor
  }
}
`;


const editarCliente = () => {

    const schema = Yup.object({
        email: Yup.string()
          .email("No es un email valido")
          .required("El email es obligatorio"),
        nombre: Yup.string().required("El nombre es obligatorio"),
        apellido: Yup.string().required("El apellido es obligatorio"),
        empresa: Yup.string().required("La empresa es obligatorio"),
      });
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { data, loading, error } = useQuery(obtenerCliente, {
    variables: {
      id,
    },
  });
  const [actualizarCliente] = useMutation(actualizar);


  if (loading)return "Cargando...";

  const actualizarClienteBack = async(values)=>{
      const {nombre, apellido, email,empresa,telefono} = values;
    try{
        const {data} = await actualizarCliente({
            variables:{
                id,
                input:{
                    nombre,
                    apellido,
                    email,
                    empresa,
                    telefono
                }
            }
        });

        router.push("/")
    }catch(e){
        console.log(e)
    }
  }


  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar cliente</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schema}
            enableReinitialize
            initialValues={data.obtenerCliente}
            onSubmit={(values,actions)=>{
                actualizarClienteBack(values)
            }}
          >
            {(props) => (
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={props.handleSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nombre"
                  >
                    Nombre
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nombre"
                    type="nombre"
                    placeholder="Introduzca su nombre"
                    value={props.values.nombre}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>

                {props.touched.nombre && props.errors.nombre ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error:</p>
                    <p>{props.errors.nombre}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="apellido"
                  >
                    Apellido
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="apellido"
                    type="text"
                    placeholder="Introduzca su apellido"
                    value={props.values.apellido}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>

                {props.touched.apellido && props.errors.apellido ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error:</p>
                    <p>{props.errors.apellido}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="empresa"
                  >
                    Empresa
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="empresa"
                    type="text"
                    placeholder="Introduzca la empresa"
                    value={props.values.empresa}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>

                {props.touched.empresa && props.errors.empresa ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error:</p>
                    <p>{props.errors.empresa}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Introduzca el email"
                    value={props.values.email}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>

                {props.touched.email && props.errors.email ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error:</p>
                    <p>{props.errors.email}</p>
                  </div>
                ) : null}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="telefono"
                  >
                    Telefono
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="telefono"
                    type="tel"
                    placeholder="Introduzca el telefono"
                    value={props.values.telefono}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>

                {props.touched.telefono && props.errors.telefono ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error:</p>
                    <p>{props.errors.telefono}</p>
                  </div>
                ) : null}

                <input
                  type="submit"
                  className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover;bg-gray-900"
                  value="actualizar cliente"
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  )
}

export default editarCliente;
