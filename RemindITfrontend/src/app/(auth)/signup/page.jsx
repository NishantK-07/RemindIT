
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
// import { api, ENDPOINT } from "@/lib/api";
import { LogIn, LucideLoader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { userLoggedInDetails } from "@/Redux/UserSlice";
import { useDispatch ,useSelector} from "react-redux";
import { toast } from "sonner";

import axios from "axios";

function signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phno,setphno]=useState("")
  const router = useRouter();
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.userstate); 

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`, {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        phoneNumber:phno
      },{
        withCredentials:true
      });
      if (res.data.status === "success") {
        toast.success("Account created successfully 🎉");
        router.push("/login");
      } else {
        toast.error(res.data.message || "Signup failed");
      }
      if (res.data) {
        // toast("Account Created!");
      }
    } catch (err) {
      // console.log("err: ", err);
      toast.error("Something went wrong. Please try again ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#000033] h-screen flex items-center justify-center">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Phone Number</Label>
              <Input
                id="phone"
                type="tel" // Use "tel" instead of "phone"
                placeholder="+91xxxxxxxxxx"
                pattern="^\+?[1-9]\d{1,14}$"
                value={phno}
                onChange={(e) => setphno(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmpassword">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button onClick={onSubmit} className="w-full">
              Create an account
              {loading && (
                <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      {/* <ToastContainer /> */}
    </div>
  )
}

export default signup



