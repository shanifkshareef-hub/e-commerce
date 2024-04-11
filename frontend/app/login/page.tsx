"use client";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { LoginData } from "../../interfaces";
import { cookieStore } from "@/utils/helpers";
import Services from "@/services/auth";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: LoginData,
    setSubmitting: (val: boolean) => void
  ) => {
    const resp = await Services.login(values);
    if (resp && resp.status && resp.data) {
      cookieStore.set("token", resp.data.token, { path: "/" });

      const res = await Services.getPk();
      if (res && res.status && res.data) {
        cookieStore.set("pk", res.data, { path: "/" });
      }

      router.push("/");
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors: { email?: string } = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
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
                  <div className="flex items-center mt-6 justify-between">
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
          <p className="text-sm mt-2">
            Don't have an account ?{" "}
            <Link
              href="/register"
              className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500 "
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
