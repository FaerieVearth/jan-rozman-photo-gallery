import React, { useState, useEffect, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { searchImages } from "./api";
import { getFolders } from "./api";
import HeroComponent from "./components/HeroComponent/HeroComponent";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [folderList, setFolderList] = useState([]);

  const photoObj = [];
  const constructPhotoObj = () => {
    if (imageList) {
      imageList.map((photo) => {
        photoObj.push({
          src: photo.url,
          height: photo.height,
          width: photo.width,
        });
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const responseJson = await searchImages("");
      const responseFolders = await getFolders();
      setImageList(responseJson.resources);
      setNextCursor(responseJson.next_cursor);
      setFolderList(responseFolders.folders);
    };

    fetchData();
  }, []);

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  constructPhotoObj();

  const handleLoadMoreButton = async () => {
    const responseJson = await searchImages("", nextCursor);
    setImageList((currentImageList) => [
      ...currentImageList,
      ...responseJson.resources,
    ]);
    setNextCursor(responseJson.next_cursor);
  };

  const searchPhotos = async (folderName) => {
    const responseJson = await searchImages(
      "folder=jr-portfolio/" + folderName,
      nextCursor
    );
    setImageList(responseJson.resources);
    setNextCursor(responseJson.next_cursor);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} centered>
              <Tab label="About Me" value="1" />
              <Tab label="My Work" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <HeroComponent></HeroComponent>
          </TabPanel>
          <TabPanel value="2">
            {folderList.map((folder) => {
              return (
                <button
                  key={folder.name}
                  onClick={() => searchPhotos(folder.name)}
                >
                  {folder.name}
                </button>
              );
            })}
            {imageList ? (
              <Gallery
                photos={photoObj}
                onClick={openLightbox}
                direction={"column"}
              />
            ) : null}
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={photoObj.map((x) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title,
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
            {nextCursor && (
              <button onClick={handleLoadMoreButton}>
                More Awesome Photos
              </button>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default App;
