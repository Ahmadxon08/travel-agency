import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Link, redirect } from "react-router";
import { loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export async function clientLoader() {
  try {
    const user = await account.get();

    if (!user.$id) {
      redirect("/");
    }
  } catch (error) {
    console.log("Hatolik login da", error);
  }
}
const SignIn = () => {
  return (
    <main className="auth">
      <section className="size-full glassmorphism flex-center ">
        <div className="sign-in-card">
          <header className="header">
            <Link to={"/"}>
              <img
                src="assets/icons/logo.svg"
                alt="logo"
                className="size-[30px]"
              />
            </Link>

            <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
          </header>
          <article>
            <h2 className="p-28-bold text-dark-100 text-center">
              Start your Travel journey
            </h2>
            <p className="p-18-regular  text-center text-gray-400 !leading-7">
              Sing in with Google
            </p>
          </article>

          <ButtonComponent
            iconCss="e-search-icon"
            onClick={loginWithGoogle}
            className="button-class !h-11 !w-full"
          >
            <img
              src="assets/icons/google.svg"
              alt="button"
              className="size-5"
            />{" "}
            <span className="p-18-semibold text-white">
              {" "}
              Sing in with Google
            </span>
          </ButtonComponent>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
