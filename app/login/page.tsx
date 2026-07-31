import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <main
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-gradient-to-br
                from-emerald-950
                via-gray-900
                to-black
                p-6
            "
        >
            <LoginForm />
        </main>
    );
}