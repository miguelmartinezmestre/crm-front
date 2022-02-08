import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";

const nuevocliente = gql`
  mutation Mutation($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      apellido
      nombre
      empresa
      email
      telefono
      vendedor
    }
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

export default function NuevoCliente() {
  const [nuevoCliente] = useMutation(nuevocliente, {
    update(cache, { data: { nuevoCliente } }) {
      const { obtenerClientesVendedor } = cache.readQuery({
        query: obtenerClientes,
      });

      cache.writeQuery({
        query: obtenerClientes,
        data: {
          obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente],
        },
      });
    },
  });
  const router:NextRouter = useRouter();
  const [mensaje, setMensaje] = useState<string>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      nombre: "",
      apellido: "",
      empresa: "",
      telefono: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("No es un email valido")
        .required("El email es obligatorio"),
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      empresa: Yup.string().required("La empresa es obligatorio"),
    }),
    onSubmit: async (values) => {
      const { email, nombre, apellido, empresa, telefono } = values;
      console.log(values);
      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              email,
              nombre,
              apellido,
              empresa,
              telefono,
            },
          },
        });
        router.push("/");
      } catch (e) {
        console.log(e);
        setMensaje(e.message.replace("Graphql error", ""));
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
      <h1 className="text-2xl text-gray-800 font-light">Nuevo cliente</h1>

      {mensaje && monstrarMensaje()}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
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
                htmlFor="empresa"
              >
                Empresa
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="empresa"
                type="text"
                placeholder="Introduzca la empresa"
                value={formik.values.empresa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.empresa && formik.errors.empresa ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error:</p>
                <p>{formik.errors.empresa}</p>
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
                htmlFor="telefono"
              >
                Telefono
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="telefono"
                type="tel"
                placeholder="Introduzca el telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.telefono && formik.errors.telefono ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error:</p>
                <p>{formik.errors.telefono}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover;bg-gray-900"
              value="añadir cliente"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}