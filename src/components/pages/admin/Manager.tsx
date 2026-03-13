import ManagerProfileForm from "@/components/form/ManagerProfileForm";
import ManagerChangePasswordForm from "@/components/form/ManagerChangePasswordForm";

const Manager = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-1">
            <ManagerProfileForm />

            <ManagerChangePasswordForm />
        </div>
    );
};

export default Manager;