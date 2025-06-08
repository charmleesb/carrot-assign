import { getUser } from "./actions";
import UserEdit from "@/components/user/UserEdit";

export default async function EditPage()  {
  const infos = await getUser();
  return (
    <UserEdit infos={infos}/>
  )
}