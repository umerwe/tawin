import { useTranslations } from "next-intl";

export default function AddressBook() {
  const t = useTranslations("translation");
  const addresses = [
    { id: 1, name: "Maryam Ahmed", phone: "(+964) 711 111 1111", address: "Baghdad, Karrada, District 555, Alley 3, House 3" },
    { id: 2, name: "Maryam Ahmed", phone: "(+964) 711 111 1111", address: "Baghdad, Karrada, District 555, Alley 3, House 3" }
  ]
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-lg font-semibold text-gray-900">{t("address")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className="border border-gray-200 rounded-2xl p-6 space-y-4 relative">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-900">{t("deliveryAddress")}</span>
              <button className="text-xs text-gray-400 font-medium hover:text-aqua">{t("edit")}</button>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">{addr.name}</p>
              <p className="text-sm text-gray-600">{addr.phone}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{addr.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}