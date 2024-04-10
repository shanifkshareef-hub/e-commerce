"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { RegisterData } from "../../interfaces";
import Services from "@/services/auth";

const Register = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: RegisterData,
    setSubmitting: (val: boolean) => void
  ) => {
    console.log("resp");

    const resp = await Services.register(values);
    if (resp && resp.status && resp.data) {
      console.log("resp", resp);

      router.push("/login");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              userName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors: { email?: string; password?: string } = {};

              if (
                values.password &&
                values.confirmPassword &&
                values.password !== values.confirmPassword
              ) {
                errors.password = "Passwords does not match";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const { confirmPassword, ...rest } = values;
              handleSubmit(rest, setSubmitting);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="space-y-2">
                  <div>
                    <label
                      htmlFor="userName"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      User name
                    </label>
                    <div className="mt-2">
                      <Field
                        id="userName"
                        name="userName"
                        type="text"
                        required
                        className="px-4 block w-full rounded-md border-0 py-1.5 bg-gray-900 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="px-4 block w-full rounded-md border-0 py-1.5 bg-gray-900 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-300"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        className="px-4 block w-full rounded-md border-0 py-1.5 bg-gray-900 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-300"
                      >
                        Confirm Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="px-4 block w-full rounded-md border-0 py-1.5 bg-gray-900 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-xs mt-2 text-red-500">
                  <ErrorMessage className="text-xs" name="password" />
                </div>

                <button
                  className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          <p
            className="text-sm mt-2 text-end font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
            onClick={() => {
              router.push("/login");
            }}
          >
            Log in
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
