import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut, signIn } from "@/auth"
import { BadgePlus } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'

const Navbar = async () => {
    const session = await auth();
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href="/">
                <Image src="/logo.png" alt='logo' width={144} height={40}></Image>
            </Link>
            <div className="flex items-center gap-5">
                {session && session?.user ? (
                    <>
                        <Link className='text-2xl' href="/startup/create">
                            <span className='max-sm:hidden'>Create</span>
                            <BadgePlus className="size-6 sm:hidden"></BadgePlus>
                        </Link>
                        <form action={async () => {
                            "use server";

                            await signOut({redirectTo: "/"})
                        }}>
                            <button className='text-2xl' type='submit'>
                                Logout
                                <LogOut className="size-6 sm:hidden text-red-500"></LogOut>
                            </button>
                        </form>
                        <Link className='text-2xl' href={`/user/${session?.id}`}>
                            <Avatar className='size-13'>
                                <AvatarImage className='size-10' src={session?.user?.image || ''} alt={session?.user?.name || ''}/>
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                        </Link>
                    </>
                ) : (
                    <form onClick={async () => {
                        "use server";

                        await signIn('github');
                    }}>
                        <button className='text-2xl' type='submit'>
                            Login
                        </button>
                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar