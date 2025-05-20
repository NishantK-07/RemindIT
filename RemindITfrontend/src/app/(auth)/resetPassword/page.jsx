"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { useParams } from 'next/navigation'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { LucideLoader2 } from "lucide-react";
import axios from "axios";


// download card first

function resetPassword() {

  const router = useRouter();
  const params = useParams()
  // const { userId } = router.query;
  const {userId}=params
    
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false); // Flag to determine if OTP is sent
  

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    
  // console.log(userId)
  
    if ( password.length === 0 || confirmPassword.length === 0 || otp.length == 0) {
     toast.warning("Please fill all fields");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("New password and Confirm password do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resetpassword/${userId}`, 
      {  password,confirmPassword,otp},{
        withCredentials:true
      }
      );
      if (res.data.status =="sucess ") {
         toast.success("Password reset successfully!");
        router.push("/login");
      } else {
         toast.error("Failed to reset password. Try again.");
      }
    } 
    catch (err) {
      toast.error("Error resetting password");

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
       <div className="h-screen flex items-center justify-center">
  <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle className="text-xl">
        Reset Password
      </CardTitle>
      <CardDescription>
        Enter the OTP and new password details below to reset your password.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      {/* OTP Field */}
      <div className="grid gap-2">
        <Label htmlFor="otp">Enter OTP</Label>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </div>

      {/* New Password Field */}
      <div className="grid gap-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Confirm New Password Field */}
      <div className="grid gap-2">
        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
        <Input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
    </CardContent>
    <CardFooter className="flex justify-end mt-4">
      <Button type="submit" onClick={handleResetPassword}>
        Submit
        {loading && (
          <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
        )}
      </Button>
    </CardFooter>
    {/* {message && <p className="text-center mt-2">{message}</p>} */}
  </Card>
</div>
    </>
  )
}

export default resetPassword
