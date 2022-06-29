import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import checkImage from "../../../assets/images/foursquare-check-in.png";
import addImg from "../../../assets/images/icn_add.png";
import BackButton from "../../../components/BackButton";
import Button from "../../../components/Button";
import Col from "../../../components/Col";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Row from "../../../components/Row";
import {
  getExamsByUserId,
  postExam,
  putAddExamImage,
  postExamImage,
} from "../../../services";
import { Creators as ExamsActions } from "../../../store/ducks/exams";
import {
  ArrowContainer,
  Title,
  DataForm,
  AddedFileWrapper,
  AddedFileContent,
  AddedFileText,
  AddedFileContainer,
  RemoveFileWrapper,
  RemoveFileText,
  AddFileButton,
  AddFileContent,
  AddFileText,
  AddImageContainer,
  Icon,
  Message,
} from "./styles";

const NewExam: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: {
      user: {
        id: string;
      };
    }) => state.user.id
  );
  const [form, setForm] = useState({
    examName: "",
    userId,
  });
  const [files, setFiles] = useState([]);
  const loading = useSelector(
    (state: {
      exams: {
        newLoading: boolean;
      };
    }) => state.exams.newLoading
  );
  const [error, setError] = useState(false);

  const pickImage = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setFiles([...files, result]);
    }
  };

  const handleFileName = (file: string): string => {
    const name = file.substring(file.lastIndexOf("/") + 1);
    if (name.length > 15) {
      return `${name.substring(0, 13)}(...)${name.substring(name.length - 4)}`;
    }
    return name;
  };

  const handleNew = async (): Promise<void> => {
    setError(false);
    if (form.examName === "") {
      setError(true);
    } else {
      dispatch(ExamsActions.setNewLoading(true));
      const response = await postExam(JSON.stringify(form));
      if (files.length > 0) {
        const imgResponse = await postExamImage(JSON.stringify(files[0]));
        console.log(imgResponse);
        // const fileResponse = await putAddExamImage(response.id, imgResponse);
        // console.log(fileResponse);
      }
      const responseList = await getExamsByUserId(userId).then((data) => {
        dispatch(ExamsActions.setList(data));
        return data;
      });
      dispatch(ExamsActions.setNewLoading(false));
      navigation.goBack();
    }
  };

  const handleRemoveImg = (index: number): void => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  useEffect(() => {
    (async (): Promise<void> => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          // eslint-disable-next-line no-alert
          alert(
            "Você precisa conceder permissões de câmera para que possa acessar imagens!"
          );
        }
      }
    })();
  }, []);

  return (
    <Container
      backgroundColor="gray"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      noHeader
    >
      <Row justifyContent="center" alignItems="center">
        <ArrowContainer>
          <BackButton onPress={(): void => navigation.goBack()} />
        </ArrowContainer>
        <Title>Meus exames</Title>
      </Row>
      <DataForm>
        <Row>
          <Input
            placeholder="Nome do exame"
            value={form.examName}
            onChange={(e: string): void => setForm({ ...form, examName: e })}
            noBold
            error={error && form.examName === ""}
          />
        </Row>
        <Row>
          <Col>
            {files.length > 0 &&
              files.map((item, index) => {
                return (
                  <Col>
                    <AddedFileWrapper>
                      <AddedFileContent>
                        <AddedFileText>
                          {handleFileName(item.uri)}
                        </AddedFileText>
                        <AddedFileContainer>
                          <Icon source={checkImage} />
                        </AddedFileContainer>
                      </AddedFileContent>
                    </AddedFileWrapper>
                    <Row
                      style={{
                        marginTop: 0,
                        paddingRight: 20,
                        justifyContent: "flex-end",
                      }}
                    >
                      <RemoveFileWrapper
                        onPress={(): void =>
                          setForm({
                            ...form,
                            files: files.filter(
                              (file) => file.uri !== item.uri
                            ),
                          })
                        }
                      >
                        <RemoveFileText
                          onPress={(): void => handleRemoveImg(index)}
                        >
                          Excluir
                        </RemoveFileText>
                      </RemoveFileWrapper>
                    </Row>
                  </Col>
                );
              })}
            <AddFileButton onPress={pickImage}>
              <AddFileContent>
                <AddFileText>
                  {files.length ? "Anexar outro" : "Anexar arquivo"}
                </AddFileText>
                <AddImageContainer>
                  <Icon source={addImg} />
                </AddImageContainer>
              </AddFileContent>
            </AddFileButton>
          </Col>
        </Row>
        <Row>
          <Message>
            Você deve anexar em 1 dos seguintes formatos: PDF; JPG; PNG
          </Message>
        </Row>
        <Row>
          <Button
            style={{ marginTop: 30 }}
            color="primary"
            title="Adicionar"
            shadow
            onPress={(): void => handleNew()}
            loading={loading}
          />
        </Row>
      </DataForm>
    </Container>
  );
};

export default NewExam;
