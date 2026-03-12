"use client";

import Image from "@/components/MyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOff, HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

const ProfileSettings = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-1">
            <Card className="lg:col-span-2 border shadow-none">
                <CardHeader className="flex flex-row items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Edit Profile</h2>
                    <Button variant="outline" size="sm" className="text-gray-400 px-6">
                        Edit
                    </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Profile Image Section */}
                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 relative rounded-full overflow-hidden border-2 border-aqua/20">
                            <Image
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
                                alt="Profile Avatar"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="primary" size="sm" className="w-auto px-6">
                                Upload Image
                            </Button>
                            <Button variant="outline" size="sm" className="text-gray-400">
                                Remove
                            </Button>
                        </div>
                    </div>

                    {/* Main Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-2">
                            <Label>First Name</Label>
                            <Input placeholder="Ahmed" className="rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <Label>Last Name</Label>
                            <Input placeholder="Complete" className="rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <div className="relative">
                                <Input placeholder="(406) 555-0120" className="pl-14 rounded-md" />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r pr-2 border-gray-200">
                                    <span className="text-base">🇮🇶</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Password</Label>
                            <div className="relative">
                                <Input type="password" placeholder="**********" className="rounded-md" />
                                <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input placeholder="wade.warren@example.com" className="rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Input placeholder="Manager" className="rounded-md" />
                    </div>
                </CardContent>
            </Card>

            <Card className="border shadow-none h-fit">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-bold">Change Password</CardTitle>
                    <div className="flex items-center gap-1 text-purple-500 cursor-pointer">
                        <HelpCircle size={16} />
                        <span className="text-xs font-medium">Help</span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="space-y-2">
                        <Label>Current Password</Label>
                        <div className="relative">
                            <Input type="password" placeholder="Enter Password" className="rounded-md" />
                            <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                        </div>
                        {/* Added flex justify-end to move this to the right */}
                        <div className="flex justify-end">
                            <button className="text-xs text-purple-600 hover:underline">
                                Forgot Password?
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>New Password</Label>
                        <div className="relative">
                            <Input type="password" placeholder="Enter Password" className="rounded-md" />
                            <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Re-enter Password</Label>
                        <div className="relative">
                            <Input type="password" placeholder="Enter Password" className="rounded-md" />
                            <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                        </div>
                    </div>

                    <Button variant="primary" className="mt-3 rounded-md">
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

        </div>
    );
};

export default ProfileSettings;