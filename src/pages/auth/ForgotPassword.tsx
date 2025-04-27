import React from 'react'

export const ForgotPassword = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <div className="w-full max-w-md rounded-2xl bg-background p-8 shadow-xl">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">Recuperar contraseña</h1>
                    <p className="text-sm text-muted-foreground">
                        Ingresa tu correo para recibir un enlace de recuperación.
                    </p>
                </div>
                {/* <ForgotPasswordForm /> */}
            </div>
        </div>
    )
}
