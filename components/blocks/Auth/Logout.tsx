"use client"
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function Logout() {
    return (
        <div>
            <Button onClick={() => signOut()} className="btn btn-primary">Sign Out</Button>
        </div>
    )
}
