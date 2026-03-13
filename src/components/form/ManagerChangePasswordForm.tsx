import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOff, HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

const ManagerChangePasswordForm = () => {
    return (
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
    )
}

export default ManagerChangePasswordForm