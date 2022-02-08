import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { NextRouter, useRouter } from "next/router";

const register = gql`
  mutation Mutation($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellidos
      email
      creado
    }
  }
`;

export default function Register() {
  const [nuevoUsuario] = useMutation(register);
  const [mensaje, setMensaje] = useState<string>(null);
  const router:NextRouter = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      nombre: "",
      apellido: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("No es un email valido")
        .required("El email es obligatorio"),
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      password: Yup.string()
        .required("El password es obligatorio")
        .min(6, "El password debe tener mas de 6 caracteres"),
    }),
    onSubmit: async (values) => {
      const { email, nombre, apellido, password } = values;

      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              email,
              nombre,
              apellidos: apellido,
              password,
            },
          },
        });
        console.log(data);

        setMensaje(
          `Se creo correctamente el usuario: ${data.nuevoUsuario.nombre}`
        );

        setTimeout(() => {
          setMensaje(null);
          router.push("/login");
        }, 3000);
      } catch (e) {
        setMensaje(e.message.replace("Graphql error: ", ""));
        console.log(e);

        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      }
    },
  });

  const monstrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-center text-2xl text-white font-light">
        Registrarse
      </h1>
      {mensaje ? monstrarMensaje() : null}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
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
                placeholder="Introduzca su email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error:</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

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
                type="text"
                placeholder="Introduzca su nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error:</p>
                <p>{formik.errors.nombre}</p>
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
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.apellido && formik.errors.apellido ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error:</p>
                <p>{formik.errors.apellido}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Introduzca su contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error:</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              value="Registrarse"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}
