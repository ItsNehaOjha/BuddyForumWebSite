import Section from "../component/Section";
import Heading from "../component/Heading";
import Button from "../component/Button";

const Dashboard = () => {
    return (
      <Section>
        <div className="container">
          <Heading
            title="App is Here"
            text="Apk is available for download"
          />
          
          <div className="flex flex-col items-center mt-8">
            <a 
              href="https://github.com/Robin-Kumar-rk/BuddyForumApp/blob/main/app/release/app-release.apk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary mb-4"
            >
              Download APK
            </a>
            <p className="text-center text-secondary mt-2">
              Click the button above to download the Android app directly from our GitHub repository
            </p>
          </div>
        </div>
      </Section>
    );
  };
  
  export default Dashboard;
  