"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Authbuttons = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleRedirect = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      console.log("There was an error logging in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {session ? (
        <Link href="/learn">
          <motion.button
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRedirect}
            disabled={loading}
          >
            {loading ? "Redirecting..." : "Start Learning Now"}{" "}
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </Link>
      ) : (
        <div className="flex justify-center">
        <motion.button
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={loginWithGoogle}
          disabled={isLoading}
        >
          Start Learning Now
        </motion.button>
      </div>      )}
    </div>
  );
};

export default Authbuttons;