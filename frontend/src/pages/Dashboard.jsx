import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { fetchUrls } from "../services/api";
import CreateUrlForm from "../components/CreateUrlForm";
import UrlList from "../components/UrlLIst";


const Dashboard = ()=>{
  const [newUrl, setNewUrl] = useState(null);
  const [urlCount, setUrlCount] = useState(0);
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    fetchUrlCount();
  }, [user]);

  const fetchUrlCount = async ()=>{
    try{
      const data = await fetchUrls(user.token);
      setUrlCount(data.length);
    }catch(error){
      console.error("Error fetching URLs:", error);
    }
  }

  const handleUrlCreated = (url)=>{
    setNewUrl(url);
    setUrlCount(prevCount => prevCount + 1);
  }



  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage all your shortened links in one place</p>
      </div>
      
      <CreateUrlForm onUrlCreated={handleUrlCreated} urlCount={urlCount} />
      <UrlList newUrl={newUrl} onUrlCountChange={setUrlCount} />
    </div>
  );
}

export default Dashboard;