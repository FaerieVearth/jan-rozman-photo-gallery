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
import Button from "@mui/material/Button";
import "./App.css";

const App = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 600);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

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
      <Box
        className="root-container"
        sx={{ width: "100%", typography: "body1", overflow: "hidden" }}
      >
        <TabContext value={value}>
          <Box sx={{ height: "6vh" }}>
            <TabList
              onChange={handleChange}
              centered
              TabIndicatorProps={{
                style: {
                  background: "#9b9b9b"
                },
              }}
            >
              <Tab
                sx={{
                  fontSize: "1.6rem",
                  color: "#9b9b9b"
                }}
                label="About Me"
                value="1"
              />
              <Tab
                sx={{
                  fontSize: "1.6rem",
                  color: "#9b9b9b"
                }}
                label="My Work"
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel className="tab-panel" value="1">
            <HeroComponent></HeroComponent>
          </TabPanel>
          <TabPanel className="tab-panel" value="2">
            <div className="button-group">
              {folderList.map((folder) => {
                return (
                  <Button
                    variant="outlined"
                    key={folder.name}
                    onClick={() => searchPhotos(folder.name)}
                    sx={{
                      border: "2px solid rgba(255, 255, 255, 0.5)",
                      color: "#fff",
                    }}
                  >
                    {folder.name}
                  </Button>
                );
              })}
            </div>
            <div>
              {isDesktop ? (
                <div>
                  {" "}
                  {imageList ? (
                    <Gallery
                      photos={photoObj}
                      onClick={openLightbox}
                      direction={"column"}
                    />
                  ) : null}
                </div>
              ) : (
                <div>
                  {" "}
                  {imageList ? (
                    <Gallery
                      photos={photoObj}
                      onClick={openLightbox}
                      direction={"row"}
                    />
                  ) : null}
                </div>
              )}
            </div>

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
              <div className="load-more">
                <Button
                  sx={{
                    border: "2px solid rgba(255, 255, 255, 0.5)",
                    color: "#fff",
                  }}
                  onClick={handleLoadMoreButton}
                  variant="contained"
                >
                  More Awesome Photos
                </Button>
              </div>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default App;
