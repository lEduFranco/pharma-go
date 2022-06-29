import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import ProfileImage from "../../assets/images/profile.png";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import Col from "../../components/Col";
import Container from "../../components/Container";
import DatePicker from "../../components/DatePicker";
import DropdownList from "../../components/DropdownList";
import Input from "../../components/Input";
import InputArea from "../../components/InputArea";
import Row from "../../components/Row";
import Tag from "../../components/Tag";
import colors from "../../config/colors";
import {
  putProfile,
  putAllergiesProfile,
  putFamilyDiseasesProfile,
} from "../../services";
import { Creators as UserActions } from "../../store/ducks/user";
import {
  ArrowContainer,
  Title,
  Profile,
  BoxWrapper,
  ButtonsContainer,
  ClinicalDataButton,
  PersonalDataButton,
  ClinicalDataButtonText,
  PersonalDataButtonText,
  DataForm,
  Message,
  CheckboxWrapper,
  CheckboxRow,
  CheckboxLabelWrapper,
  Label,
  TagsWrapper,
} from "./styles";

const Home: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileData = useSelector(
    (state: {
      user: {
        profile: {
          birthDate: string;
          name: string;
          cpf: string;
          phone: string;
          sexo: string;
          bloodGroup: string;
          preexistingCondition: string;
          specialNeed: string;
          weight: string;
          height: string;
          allergies: [];
          usaMarcapasso: boolean;
          proteseOrtopedica: boolean;
          alteracoesCardiacas: boolean;
          familyDiseases: [];
          cancerRegion: string;
          rareDisease: string;
          physicalActivityPractice: boolean;
          physicalActivityFrequency: boolean;
          smokeCigarette: boolean;
          averageCigaretteSmoke: string;
          alcoholConsumes: boolean;
          frequencyAlcoholConsumption: string;
          drugUser: boolean;
          healthPlanId: string;
          healthPlan: object;
          userId: string;
          id: string;
        };
      };
    }) => state.user.profile
  );
  const allergies = useSelector(
    (state: {
      allergies: {
        list: [
          {
            description: string;
            id: string;
          }
        ];
      };
    }) => state.allergies.list
  );
  const familyDiseases = useSelector(
    (state: {
      familyDiseases: {
        list: [
          {
            description: string;
            id: string;
          }
        ];
      };
    }) => state.familyDiseases.list
  );
  const healthPlans = useSelector(
    (state: {
      healthPlans: {
        list: [
          {
            description: string;
            id: string;
          }
        ];
      };
    }) => state.healthPlans.list
  );
  const [selected, setSelected] = useState({
    clinical: false,
    personal: true,
  });
  const [allergyTags, setAllergyTags] = useState(() => {
    let list = {};
    profileData.allergies.forEach((item) => {
      if (item) list = { ...list, [item.id]: true };
    });
    return list;
  });
  const [diseaseTags, setDiseaseTags] = useState(() => {
    let list = {};
    profileData.familyDiseases.forEach((item) => {
      if (item) list = { ...list, [item.id]: true };
    });
    return list;
  });
  const [clinicalForm, setClinicalForm] = useState({
    sex: profileData.sexo,
    bloodType: profileData.bloodGroup,
    preexistingConditions: profileData.preexistingCondition,
    specialNeeds: profileData.specialNeed,
    weight: profileData.weight,
    height: profileData.height,
    pacemaker: profileData.usaMarcapasso,
    orthopedicProtesis: profileData.proteseOrtopedica,
    cardiacAlterations: profileData.alteracoesCardiacas,
    hasDiseaseHistory: diseaseTags.hasFamilyDiseases,
    diseaseHistory: profileData.familyDiseases,
    cancerRegion: profileData.cancerRegion,
    rareDiseaseRegion: profileData.rareDisease,
    physicalActivity: profileData.physicalActivityFrequency,
    physicalActivityOption: {
      optionOne: profileData.physicalActivityFrequency,
      optionTwo: !profileData.physicalActivityFrequency,
    },
    cigarette: profileData.smokeCigarette,
    cigarreteFrequencyOption: {
      optionOne: profileData.averageCigaretteSmoke === "1",
      optionTwo: profileData.averageCigaretteSmoke === "2",
      optionThree: profileData.averageCigaretteSmoke === "3",
      optionFour: profileData.averageCigaretteSmoke === "4",
      optionFive: profileData.averageCigaretteSmoke === "5",
    },
    alcohol: profileData.alcoholConsumes,
    alcoholicBeverages: profileData.alcoholicBeverages,
    alcoholFrequencyOption: {
      optionOne: profileData.frequencyAlcoholConsumption === "1",
      optionTwo: profileData.frequencyAlcoholConsumption === "2",
      optionThree: profileData.frequencyAlcoholConsumption === "3",
    },
    illicitDrugs: profileData.drugUser,
  });
  const [personalForm, setPersonalForm] = useState({
    telephone: profileData.phone,
    cpf: profileData.cpf,
    birthdate: profileData.birthDate,
  });
  const [birthDate, setBirthDate] = useState(new Date(profileData.birthDate));
  const [selectedHealthPlanId, setSelectedHealthPlanId] = useState(
    profileData.healthPlanId
  );
  const [personalLoading, setPersonalLoading] = useState(false);
  const [clinicalLoading, setClinicalLoading] = useState(false);
  const [personalFormError, setPersonalFormError] = useState(false);
  const [clinicalFormError, setClinicalFormError] = useState(false);

  const getAllergyList = (): {
    perfilRelId: string;
    allergyRelId: string;
  }[] => {
    const list: { perfilRelId: string; allergyRelId: string }[] = [];
    Object.entries(allergyTags).forEach((item) => {
      if (item[0] !== "undefined" && item[1] === true)
        list.push({
          perfilRelId: profileData.id,
          allergyRelId: item[0],
        });
    });
    console.log(list);
    return list;
  };

  const getFamilyDiseasesList = (): {
    perfilRelId: string;
    familyDiseasesRelId: string;
  }[] => {
    const list: { perfilRelId: string; familyDiseasesRelId: string }[] = [];
    Object.entries(diseaseTags).forEach((item) => {
      if (item[0] !== "undefined" && item[1] === true)
        list.push({
          perfilRelId: profileData.id,
          familyDiseasesRelId: item[0],
        });
    });
    console.log(list);
    return list;
  };

  const getHealthPlansList = (): { label: string; value: string }[] => {
    const list: { label: string; value: string }[] = [];
    if (healthPlans)
      healthPlans.forEach((item) => {
        list.push({ label: item.description, value: item.id });
      });
    return list;
  };

  const handleEditPersonalData = async (): Promise<void> => {
    setPersonalFormError(false);
    if (
      personalForm.telephone === "" ||
      personalForm.cpf === "" ||
      selectedHealthPlanId === null
    ) {
      setPersonalFormError(true);
    } else {
      setPersonalLoading(true);
      const editedProfileData = {
        ...profileData,
        birthDate: moment.utc(birthDate).toISOString(),
        cpf: profileData.cpf,
        phone: profileData.phone,
        healthPlanId: selectedHealthPlanId,
        healthPlan: healthPlans.find((x) => x.id === selectedHealthPlanId),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await putProfile(
        profileData.id,
        JSON.stringify(editedProfileData)
      ).then((data) => {
        dispatch(UserActions.setUserProfile(data));
        setPersonalLoading(false);
        navigation.goBack();
      });
      setPersonalLoading(false);
    }
  };

  const handleEditClinicalData = async (): Promise<void> => {
    setClinicalFormError(false);
    if (clinicalForm.sex === null || clinicalForm.bloodType === null) {
      setClinicalFormError(true);
    } else {
      setClinicalLoading(true);
      const editedClinicalData = {
        ...profileData,
        sexo: clinicalForm.sex,
        bloodGroup: clinicalForm.bloodType,
        preexistingCondition: clinicalForm.preexistingConditions,
        specialNeed: clinicalForm.specialNeeds,
        weight: clinicalForm.weight,
        height: clinicalForm.height,
        usaMarcapasso: clinicalForm.pacemaker,
        proteseOrtopedica: clinicalForm.orthopedicProtesis,
        alteracoesCardiacas: clinicalForm.cardiacAlterations,
        cancerRegion: clinicalForm.cancerRegion,
        rareDisease: clinicalForm.rareDiseaseRegion,
        physicalActivityPractice: clinicalForm.physicalActivity,
        physicalActivityFrequency:
          clinicalForm.physicalActivityOption.optionOne,
        smokeCigarette: clinicalForm.cigarette,
        averageCigaretteSmoke: clinicalForm.cigarreteFrequencyOption.optionOne
          ? "1"
          : clinicalForm.cigarreteFrequencyOption.optionTwo
          ? "2"
          : clinicalForm.cigarreteFrequencyOption.optionThree
          ? "3"
          : clinicalForm.cigarreteFrequencyOption.optionFour
          ? "4"
          : "5",
        alcoholConsumes: clinicalForm.alcohol,
        alcoholicBeverages: clinicalForm.alcoholicBeverages,
        frequencyAlcoholConsumption: clinicalForm.alcoholFrequencyOption
          .optionOne
          ? "1"
          : clinicalForm.alcoholFrequencyOption.optionTwo
          ? "2"
          : "3",
        drugUser: clinicalForm.illicitDrugs,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const allergiesResponse = await putAllergiesProfile(
        profileData.id,
        JSON.stringify(getAllergyList())
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const familyDiseasesResponse = await putFamilyDiseasesProfile(
        profileData.id,
        JSON.stringify(getFamilyDiseasesList())
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await putProfile(
        profileData.id,
        JSON.stringify(editedClinicalData)
      ).then((data) => {
        dispatch(UserActions.setUserProfile(data));
        setClinicalLoading(false);
        navigation.goBack();
      });
      setClinicalLoading(false);
    }
  };

  return (
    <Container
      backgroundColor="gray"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <BoxWrapper>
        <Row>
          <ArrowContainer>
            <BackButton onPress={(): void => navigation.goBack()} />
          </ArrowContainer>
          <Title>
            {profileData.name}, {moment().diff(profileData.birthDate, "years")}
          </Title>
        </Row>
        <Row>
          <Profile source={ProfileImage} />
        </Row>
        <ButtonsContainer>
          <ClinicalDataButton
            selected={selected.clinical}
            onPress={(): void =>
              setSelected({ clinical: true, personal: false })
            }
          >
            <ClinicalDataButtonText selected={selected.clinical}>
              Dados clínicos
            </ClinicalDataButtonText>
          </ClinicalDataButton>
          <PersonalDataButton
            selected={selected.personal}
            onPress={(): void =>
              setSelected({ clinical: false, personal: true })
            }
          >
            <PersonalDataButtonText selected={selected.personal}>
              Dados pessoais
            </PersonalDataButtonText>
          </PersonalDataButton>
        </ButtonsContainer>
        {selected.clinical && (
          <DataForm>
            <Message>Edite as informações a qualquer momento :)</Message>
            <Row>
              <DropdownList
                label="Sexo: "
                selected={clinicalForm.sex}
                setSelected={(e: string): void =>
                  setClinicalForm({ ...clinicalForm, sex: e })
                }
                items={[
                  { label: "Masculino", value: "masculino" },
                  { label: "Feminino", value: "feminino" },
                ]}
                placeholder="Sexo"
                error={clinicalFormError && clinicalForm.sex === null}
              />
            </Row>
            <Row>
              <DropdownList
                label="Tipo Sanguíneo: "
                selected={clinicalForm.bloodType}
                setSelected={(e: string): void =>
                  setClinicalForm({ ...clinicalForm, bloodType: e })
                }
                items={[
                  { label: "A+", value: "A+" },
                  { label: "B+", value: "B+" },
                  { label: "AB+", value: "AB+" },
                  { label: "A-", value: "A-" },
                  { label: "B-", value: "B-" },
                  { label: "AB-", value: "AB-" },
                  { label: "O+", value: "O+" },
                  { label: "O-", value: "O-" },
                ]}
                placeholder="Escolha seu tipo sanguíneo"
                error={clinicalFormError && clinicalForm.bloodType === null}
              />
            </Row>
            <Row>
              <InputArea
                numberOfLines={1}
                label="Condições preexistentes: "
                placeholder="Adicionar"
                value={clinicalForm.preexistingConditions}
                onChange={(e: string): void =>
                  setClinicalForm({ ...clinicalForm, preexistingConditions: e })
                }
                blue
                bold
              />
            </Row>
            <Row>
              <InputArea
                numberOfLines={1}
                label="Necessidades especiais: "
                placeholder="Adicionar"
                value={clinicalForm.specialNeeds}
                onChange={(e: string): void =>
                  setClinicalForm({ ...clinicalForm, specialNeeds: e })
                }
                blue
                bold
              />
            </Row>
            <Row>
              <Input
                label="Peso: "
                placeholder="Adicionar"
                value={clinicalForm.weight}
                onChange={(e: string): void =>
                  setClinicalForm({ ...clinicalForm, weight: e })
                }
                blue
                bold
              />
            </Row>
            <Row>
              <Input
                label="Altura: "
                placeholder="Adicionar"
                value={clinicalForm.height}
                onChange={(e: string): void =>
                  setClinicalForm({ ...clinicalForm, height: e })
                }
                blue
                bold
              />
            </Row>
            <Row>
              <Col>
                <CheckboxWrapper>
                  <CheckboxLabelWrapper>
                    <Label>Alergia(s):</Label>
                  </CheckboxLabelWrapper>
                  <CheckboxLabelWrapper>
                    <TagsWrapper>
                      {allergies ? (
                        allergies.map((item, index) => {
                          return (
                            <Tag
                              title={item.description}
                              pressed={allergyTags[item.id]}
                              onPress={(): void => {
                                setAllergyTags({
                                  ...allergyTags,
                                  [item.id]: !allergyTags[item.id],
                                });
                              }}
                            />
                          );
                        })
                      ) : (
                        <ActivityIndicator
                          color={colors.blue01}
                          animating={allergies === null}
                          style={{
                            height: 100,
                            width: "100%",
                            display: "flex",
                          }}
                        />
                      )}
                    </TagsWrapper>
                  </CheckboxLabelWrapper>
                </CheckboxWrapper>
              </Col>
            </Row>
            <Row
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#BEBEBE",
              }}
            >
              <Col>
                <CheckboxLabelWrapper>
                  <Label>Usa marcapasso:</Label>
                </CheckboxLabelWrapper>
                <CheckboxRow>
                  <Checkbox
                    title="Sim"
                    checked={clinicalForm.pacemaker}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    style={{ marginRight: 30 }}
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        pacemaker: !clinicalForm.pacemaker,
                      })
                    }
                  />
                  <Checkbox
                    title="Não"
                    checked={!clinicalForm.pacemaker}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        pacemaker: !clinicalForm.pacemaker,
                      })
                    }
                  />
                </CheckboxRow>
              </Col>
            </Row>
            <Row
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#BEBEBE",
              }}
            >
              <Col>
                <CheckboxLabelWrapper>
                  <Label>Prótese ortopédica:</Label>
                </CheckboxLabelWrapper>
                <CheckboxRow>
                  <Checkbox
                    title="Sim"
                    checked={clinicalForm.orthopedicProtesis}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    style={{ marginRight: 30 }}
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        orthopedicProtesis: !clinicalForm.orthopedicProtesis,
                      })
                    }
                  />
                  <Checkbox
                    title="Não"
                    checked={!clinicalForm.orthopedicProtesis}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        orthopedicProtesis: !clinicalForm.orthopedicProtesis,
                      })
                    }
                  />
                </CheckboxRow>
              </Col>
            </Row>
            <Row
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#BEBEBE",
              }}
            >
              <Col>
                <CheckboxLabelWrapper>
                  <Label>Alterações cardíacas:</Label>
                </CheckboxLabelWrapper>
                <CheckboxRow>
                  <Checkbox
                    title="Sim"
                    checked={clinicalForm.cardiacAlterations}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    style={{ marginRight: 30 }}
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        cardiacAlterations: !clinicalForm.cardiacAlterations,
                      })
                    }
                  />
                  <Checkbox
                    title="Não"
                    checked={!clinicalForm.cardiacAlterations}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        cardiacAlterations: !clinicalForm.cardiacAlterations,
                      })
                    }
                  />
                </CheckboxRow>
              </Col>
            </Row>
            <Row>
              <Col>
                <CheckboxWrapper>
                  <CheckboxLabelWrapper>
                    <Label>Histórico de doenças familiares:</Label>
                  </CheckboxLabelWrapper>
                  <CheckboxRow
                    style={{
                      paddingBottom: 10,
                    }}
                  >
                    <Checkbox
                      title="Sim"
                      checked={clinicalForm.hasDiseaseHistory}
                      color="white"
                      labelColor="white"
                      fillingColor="primary"
                      style={{ marginRight: 30 }}
                      setChecked={(): void =>
                        setClinicalForm({
                          ...clinicalForm,
                          hasDiseaseHistory: !clinicalForm.hasDiseaseHistory,
                        })
                      }
                    />
                    <Checkbox
                      title="Não"
                      checked={!clinicalForm.hasDiseaseHistory}
                      color="white"
                      labelColor="white"
                      fillingColor="primary"
                      setChecked={(): void => {
                        setClinicalForm({
                          ...clinicalForm,
                          hasDiseaseHistory: !clinicalForm.hasDiseaseHistory,
                        });
                        setDiseaseTags({});
                      }}
                    />
                  </CheckboxRow>
                  <CheckboxLabelWrapper>
                    {clinicalForm.hasDiseaseHistory && (
                      <>
                        <Label>Qual(is):</Label>
                        <TagsWrapper>
                          {familyDiseases ? (
                            familyDiseases.map((item, index) => {
                              return (
                                <Tag
                                  title={item.description}
                                  pressed={diseaseTags[item.id]}
                                  onPress={(): void => {
                                    setDiseaseTags({
                                      ...diseaseTags,
                                      [item.id]: !diseaseTags[item.id],
                                    });
                                  }}
                                />
                              );
                            })
                          ) : (
                            <ActivityIndicator
                              color={colors.blue01}
                              animating={familyDiseases === null}
                              style={{
                                height: 100,
                                width: "100%",
                                display: "flex",
                              }}
                            />
                          )}
                        </TagsWrapper>
                      </>
                    )}
                  </CheckboxLabelWrapper>
                </CheckboxWrapper>
              </Col>
            </Row>
            <Row>
              <InputArea
                label="Em caso de câncer, qual a região: "
                placeholder="Adicionar"
                value={clinicalForm.cancerRegion}
                onChange={(e: string): void =>
                  setClinicalForm({ ...clinicalForm, cancerRegion: e })
                }
                blue
                bold
              />
            </Row>
            <Row>
              <InputArea
                label="Em caso de doença rara, qual a região: "
                placeholder="Adicionar"
                value={clinicalForm.rareDiseaseRegion}
                onChange={(e: string): void =>
                  setClinicalForm({ ...clinicalForm, rareDiseaseRegion: e })
                }
                blue
                bold
              />
            </Row>
            <Row
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#BEBEBE",
              }}
            >
              <Col>
                <CheckboxLabelWrapper>
                  <Label>Pratica atividade física:</Label>
                </CheckboxLabelWrapper>
                <CheckboxRow>
                  <Checkbox
                    title="Sim"
                    checked={clinicalForm.physicalActivity}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    style={{ marginRight: 30 }}
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        physicalActivity: !clinicalForm.physicalActivity,
                      })
                    }
                  />
                  <Checkbox
                    title="Não"
                    checked={!clinicalForm.physicalActivity}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        physicalActivity: !clinicalForm.physicalActivity,
                      })
                    }
                  />
                </CheckboxRow>
                {clinicalForm.physicalActivity && (
                  <>
                    <CheckboxLabelWrapper style={{ marginTop: 15 }}>
                      <Label>Em caso de sim, qual a frequência?</Label>
                    </CheckboxLabelWrapper>
                    <CheckboxRow>
                      <Checkbox
                        title="1 a 3 vezes por semana"
                        checked={clinicalForm.physicalActivityOption.optionOne}
                        color="white"
                        labelColor="white"
                        fillingColor="primary"
                        style={{ marginRight: 30 }}
                        setChecked={(): void =>
                          setClinicalForm({
                            ...clinicalForm,
                            physicalActivityOption: {
                              optionOne: true,
                              optionTwo: false,
                            },
                          })
                        }
                      />
                    </CheckboxRow>
                    <CheckboxRow>
                      <Checkbox
                        title="Acima de 3 vezes por semana"
                        checked={clinicalForm.physicalActivityOption.optionTwo}
                        color="white"
                        labelColor="white"
                        fillingColor="primary"
                        setChecked={(): void =>
                          setClinicalForm({
                            ...clinicalForm,
                            physicalActivityOption: {
                              optionOne: false,
                              optionTwo: true,
                            },
                          })
                        }
                      />
                    </CheckboxRow>
                  </>
                )}
              </Col>
            </Row>
            <Row
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#BEBEBE",
              }}
            >
              <Col>
                <CheckboxLabelWrapper>
                  <Label>Faz uso de cigarro:</Label>
                </CheckboxLabelWrapper>
                <CheckboxRow>
                  <Checkbox
                    title="Sim"
                    checked={clinicalForm.cigarette}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    style={{ marginRight: 30 }}
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        cigarette: !clinicalForm.cigarette,
                      })
                    }
                  />
                  <Checkbox
                    title="Não"
                    checked={!clinicalForm.cigarette}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        cigarette: !clinicalForm.cigarette,
                      })
                    }
                  />
                </CheckboxRow>
                {clinicalForm.cigarette && (
                  <>
                    <CheckboxLabelWrapper style={{ marginTop: 15 }}>
                      <Label>Em caso de sim, qual a média por dia?</Label>
                    </CheckboxLabelWrapper>
                    <CheckboxRow>
                      <Checkbox
                        title="Até 5 cigarros"
                        checked={
                          clinicalForm.cigarreteFrequencyOption.optionOne
                        }
                        color="white"
                        labelColor="white"
                        fillingColor="primary"
                        setChecked={(): void =>
                          setClinicalForm({
                            ...clinicalForm,
                            cigarreteFrequencyOption: {
                              optionOne: true,
                              optionTwo: false,
                              optionThree: false,
                              optionFour: false,
                              optionFive: false,
                            },
                          })
                        }
                      />
                    </CheckboxRow>
                    <CheckboxRow>
                      <Checkbox
                        title="De 5 a 10 cigarros"
                        checked={
                          clinicalForm.cigarreteFrequencyOption.optionTwo
                        }
                        color="white"
                        labelColor="white"
                        fillingColor="primary"
                        setChecked={(): void =>
                          setClinicalForm({
                            ...clinicalForm,
                            cigarreteFrequencyOption: {
                              optionOne: false,
                              optionTwo: true,
                              optionThree: false,
                              optionFour: false,
                              optionFive: false,
                            },
                          })
                        }
                      />
                    </CheckboxRow>
                    <CheckboxRow>
                      <Checkbox
                        title="Até um maço"
                        checked={
                          clinicalForm.cigarreteFrequencyOption.optionThree
                        }
                        color="white"
                        labelColor="white"
                        fillingColor="primary"
                        setChecked={(): void =>
                          setClinicalForm({
                            ...clinicalForm,
                            cigarreteFrequencyOption: {
                              optionOne: false,
                              optionTwo: false,
                              optionThree: true,
                              optionFour: false,
                              optionFive: false,
                            },
                          })
                        }
                      />
                    </CheckboxRow>
                    <CheckboxRow>
                      <Checkbox
                        title="De 1 a 2 maços"
                        checked={
                          clinicalForm.cigarreteFrequencyOption.optionFour
                        }
                        color="white"
                        labelColor="white"
                        fillingColor="primary"
                        setChecked={(): void =>
                          setClinicalForm({
                            ...clinicalForm,
                            cigarreteFrequencyOption: {
                              optionOne: false,
                              optionTwo: false,
                              optionThree: false,
                              optionFour: true,
                              optionFive: false,
                            },
                          })
                        }
                      />
                    </CheckboxRow>
                    <CheckboxRow>
                      <Checkbox
                        title="Mais de 2 maços"
                        checked={
                          clinicalForm.cigarreteFrequencyOption.optionFive
                        }
                        color="white"
                        labelColor="white"
                        fillingColor="primary"
                        setChecked={(): void =>
                          setClinicalForm({
                            ...clinicalForm,
                            cigarreteFrequencyOption: {
                              optionOne: false,
                              optionTwo: false,
                              optionThree: false,
                              optionFour: false,
                              optionFive: true,
                            },
                          })
                        }
                      />
                    </CheckboxRow>
                  </>
                )}
              </Col>
            </Row>
            <Row
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#BEBEBE",
              }}
            >
              <Col>
                <CheckboxLabelWrapper>
                  <Label>Faz uso de bebida alcoólica?</Label>
                </CheckboxLabelWrapper>
                <CheckboxRow>
                  <Checkbox
                    title="Sim"
                    checked={clinicalForm.alcohol}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    style={{ marginRight: 30 }}
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        alcohol: !clinicalForm.alcohol,
                      })
                    }
                  />
                  <Checkbox
                    title="Não"
                    checked={!clinicalForm.alcohol}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        alcohol: !clinicalForm.alcohol,
                      })
                    }
                  />
                </CheckboxRow>
                {clinicalForm.alcohol && (
                  <>
                    <CheckboxRow style={{ marginTop: 15 }}>
                      <InputArea
                        numberOfLines={1}
                        label="Em caso de sim, qual bebida? "
                        placeholder="Adicionar"
                        value={clinicalForm.alcoholicBeverages}
                        onChange={(e: string): void =>
                          setClinicalForm({
                            ...clinicalForm,
                            alcoholicBeverages: e,
                          })
                        }
                        blue
                        bold
                      />
                    </CheckboxRow>
                    <CheckboxLabelWrapper style={{ marginTop: 15 }}>
                      <Label>Em caso de sim, qual a frequência?</Label>
                    </CheckboxLabelWrapper>
                    <CheckboxRow>
                      <Checkbox
                        title="Socialmente"
                        checked={clinicalForm.alcoholFrequencyOption.optionOne}
                        color="white"
                        labelColor="white"
                        fillingColor="primary"
                        setChecked={(): void =>
                          setClinicalForm({
                            ...clinicalForm,
                            alcoholFrequencyOption: {
                              optionOne: true,
                              optionTwo: false,
                              optionThree: false,
                            },
                          })
                        }
                      />
                    </CheckboxRow>
                    <CheckboxRow>
                      <Checkbox
                        title="2 a 3 vezes por semana"
                        checked={clinicalForm.alcoholFrequencyOption.optionTwo}
                        color="white"
                        labelColor="white"
                        fillingColor="primary"
                        setChecked={(): void =>
                          setClinicalForm({
                            ...clinicalForm,
                            alcoholFrequencyOption: {
                              optionOne: false,
                              optionTwo: true,
                              optionThree: false,
                            },
                          })
                        }
                      />
                    </CheckboxRow>
                    <CheckboxRow>
                      <Checkbox
                        title="Acima de 4 vezes por semana"
                        checked={
                          clinicalForm.alcoholFrequencyOption.optionThree
                        }
                        color="white"
                        labelColor="white"
                        fillingColor="primary"
                        setChecked={(): void =>
                          setClinicalForm({
                            ...clinicalForm,
                            alcoholFrequencyOption: {
                              optionOne: false,
                              optionTwo: false,
                              optionThree: true,
                            },
                          })
                        }
                      />
                    </CheckboxRow>
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <CheckboxLabelWrapper>
                  <Label>Faz uso de drogas ilícitas:</Label>
                </CheckboxLabelWrapper>
                <CheckboxRow>
                  <Checkbox
                    title="Sim"
                    checked={clinicalForm.illicitDrugs}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    style={{ marginRight: 30 }}
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        illicitDrugs: !clinicalForm.illicitDrugs,
                      })
                    }
                  />
                  <Checkbox
                    title="Não"
                    checked={!clinicalForm.illicitDrugs}
                    color="white"
                    labelColor="white"
                    fillingColor="primary"
                    setChecked={(): void =>
                      setClinicalForm({
                        ...clinicalForm,
                        illicitDrugs: !clinicalForm.illicitDrugs,
                      })
                    }
                  />
                </CheckboxRow>
              </Col>
            </Row>
            <Row>
              <Button
                color="primary"
                title="Salvar edições"
                size="small"
                onPress={(): Promise<void> => handleEditClinicalData()}
                loading={clinicalLoading}
              />
            </Row>
            <Row>
              <Button
                color="white"
                borderColor="primary"
                title="Compartilhar dados"
                size="small"
                onPress={(): Promise<void> => handleEditClinicalData()}
              />
            </Row>
          </DataForm>
        )}
        {selected.personal && (
          <DataForm>
            <Message>Edite as informações a qualquer momento :)</Message>
            <Row>
              <Input
                label="Telefone: "
                placeholder="(xx) xxxxx xxxx"
                value={personalForm.telephone}
                onChange={(e: string): void =>
                  setPersonalForm({ ...personalForm, telephone: e })
                }
                bold
                type="phone"
                error={personalFormError && personalForm.telephone === ""}
              />
            </Row>
            <Row>
              <Input
                label="CPF: "
                placeholder="xxx.xxx.xxx-xx"
                value={personalForm.cpf}
                onChange={(e: string): void =>
                  setPersonalForm({ ...personalForm, cpf: e })
                }
                bold
                type="cpf"
                error={personalFormError && personalForm.cpf === ""}
              />
            </Row>
            <Row>
              <DatePicker
                label="Data de nasc.: "
                placeholder="dd/mm/aaaa"
                value={birthDate}
                onChange={(e: Date): void => setBirthDate(e)}
                mode="date"
              />
            </Row>
            <Row>
              <DropdownList
                label="Plano de Saúde: "
                selected={selectedHealthPlanId}
                setSelected={(e: string): void => setSelectedHealthPlanId(e)}
                items={getHealthPlansList()}
                placeholder="Escolha seu plano"
                error={personalFormError && selectedHealthPlanId === null}
              />
            </Row>
            <Row>
              <Button
                color="primary"
                title="Aplicar"
                size="small"
                onPress={(): Promise<void> => handleEditPersonalData()}
                loading={personalLoading}
              />
            </Row>
          </DataForm>
        )}
      </BoxWrapper>
    </Container>
  );
};

export default Home;
