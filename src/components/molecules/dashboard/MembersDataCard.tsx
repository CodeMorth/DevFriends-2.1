export const MembersDataCard = ({ tittle, value, icon }: any) => {
  return (
    <div className="flex gap-4  w-full tablet:w-auto justify-start items-center bg-[#2A2A4A] p-3 tablet:p-4 rounded-md border border-primaryBlue">
      <div className="w-10 h-10">{icon}</div>
      <div className="flex flex-col gap-1">
        <h2 className="text-primaryPink text-nowrap text-xl tablet:text-2xl font-bold">{tittle}</h2>
        <h4 className="text-white text-2xl tablet:text-3xl font-extrabold">{value}</h4>
      </div>
    </div>
  )
}
