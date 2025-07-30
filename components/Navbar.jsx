"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const [providers, setproviders] = useState(null);
  useEffect(() => {
    const setUpproviders = async () => {
      const response = await getProviders();
      setproviders(response);
    };

    setUpproviders();
  }, []);
  const [dropdown, setdropdown] = useState(false);
  const { data: session } = useSession();
  return (
    <nav className="w-full relative p-4">
  {/* Desktop Navigation */}
  <div className="hidden sm:flex justify-between items-center w-full">
    {session?.user ? (
      <>
  <div className="flex justify-between items-center w-full px-4 py-2">
  {/* Left side: Logo + My Posts/Home */}
  <div className="flex items-center gap-4">
   <Link href="/">
    <Image
      src="/assets/icons/artificial-intelligence.png"
      width={40}
      height={40}
      alt="Logo"
    /></Link>
    {
      <Link className="black_btn" href="/user-prompt" onClick={() => setmypost(true)}>
        My Posts
      </Link>
    }
  </div>

  {/* Right side: Create Post | Sign Out | Profile Image */}
  <div className="flex gap-4 items-center">
    <Link className="black_btn" href="/create-prompt">
      Create Post
    </Link>
    <button type="button" onClick={signOut} className="outline_btn">
      Sign Out
    </button>
    <Image
      src={session?.user.image}
      width={37}
      height={37}
      alt="Profile"
      className="rounded-full"
    />
  </div>
</div>

      </>
    ) : (
      <div className="flex justify-between items-center w-full px-4 py-2">
          <div className="flex items-center gap-4">
            <Link href="/" >
    <Image
      src="/assets/icons/artificial-intelligence.png"
      width={40}
      height={40}
      alt="Logo"
    /></Link>
    </div>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.id}
              onClick={() => signIn(provider.id)}
              className="black_btn"
            >
              Sign In
            </button>
          ))}
      </div>
    )}
  </div>

  {/* Mobile Navigation */}
<div className="sm:hidden flex justify-between items-center w-full px-4">

   <div >
    <Link href="/" >
    <Image
      src="/assets/icons/artificial-intelligence.png"
      width={24}
      height={24}
      alt="Logo"
    />
    </Link>
  </div>
  
  {session?.user ? (
    <div className="relative">
      <Image
        src={session?.user.image}
        width={37}
        height={37}
        alt="Profile"
        className="rounded-full cursor-pointer"
        onClick={() => setdropdown(!dropdown)}
      />
      {dropdown && (
        <div className="dropdown absolute top-12 right-0 bg-white p-4 shadow-md rounded-md z-50 flex flex-col items-start text-right">
          {
            <Link
              className="dropdown_link text-left w-full"
              href="/user-prompt"
              onClick={() => {
                setdropdown(false);
                setmypost(true);
              }}
            >
              My Posts
            </Link>
          }
          <Link
            href="/create-prompt"
            className="dropdown_link text-left w-full"
            onClick={() => setdropdown(false)}
          >
            Create
          </Link>
          <button
            className="black_btn mt-2 text-left w-full"
            onClick={() => {
              setdropdown(false);
              signOut();
            }}
            type="button"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="ml-auto flex items-center gap-4">
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            type="button"
            key={provider.id}
            onClick={() => signIn(provider.id)}
            className="black_btn"
          >
            Sign In
          </button>
        ))}
    </div>
  )}

 
</div>

</nav>

  );
};

export default Navbar;
