import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import BackButton from "../../../components/BackButton";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import DatePicker from "../../../components/DatePicker";
import DropdownList from "../../../components/DropdownList";
import Input from "../../../components/Input";
import InputArea from "../../../components/InputArea";
import Row from "../../../components/Row";
import { getPharmacyByUserId, postPharmacy } from "../../../services";
import { Creators as PharmacyActions } from "../../../store/ducks/pharmacy";
import { ArrowContainer, Title, DataForm } from "./styles";

const NewReceipt: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const howToUse = useSelector(
    (state: {
      howToUse: {
        list: [
          {
            description: string;
            id: string;
          }
        ];
      };
    }) => state.howToUse.list
  );
  const instructionUses = useSelector(
    (state: {
      instructionUses: {
        list: [
          {
            description: string;
            id: string;
          }
        ];
      };
    }) => state.instructionUses.list
  );
  const userId = useSelector(
    (state: {
      user: {
        id: string;
      };
    }) => state.user.id
  );
  const loading = useSelector(
    (state: {
      pharmacy: {
        newLoading: boolean;
      };
    }) => state.pharmacy.newLoading
  );
  const [form, setForm] = useState({
    medicineName: "",
    amount: "",
    howToUse: {
      description: "",
      id: "",
    },
    howToUseId: "",
    adverseReactions: "",
    validity: "",
    instructionUse: {
      description: "",
      id: "",
    },
    instructionUseId: "",
    userId,
  });
  const [validity, setValidity] = useState(new Date());
  const [error, setError] = useState(false);

  const handleNew = async (): Promise<void> => {
    setError(false);
    if (
      form.medicineName === "" ||
      form.amount === "" ||
      form.howToUse === null ||
      form.howToUseId === null ||
      form.adverseReactions === "" ||
      form.instructionUse === null ||
      form.instructionUseId === null
    ) {
      setError(true);
    } else {
      dispatch(PharmacyActions.setNewLoading(true));
      const newForm = {
        medicineName: form.medicineName,
        amount: form.amount,
        adverseReactions: form.adverseReactions,
        howToUseId: form.howToUseId,
        instructionUseId: form.instructionUseId,
        validity: moment.utc(validity).toISOString(),
        userId,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await postPharmacy(JSON.stringify(newForm));
      console.log(response);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const responseList = await getPharmacyByUserId(userId).then((data) => {
        dispatch(PharmacyActions.setList(data));
        return data;
      });
      dispatch(PharmacyActions.setNewLoading(false));
      navigation.goBack();
    }
  };

  const getHowToUseArray = (): {
    label: string;
    value: { description: string; id: string };
  }[] => {
    const array: {
      label: string;
      value: { description: string; id: string };
    }[] = [];
    if (howToUse)
      howToUse.forEach((item) => {
        array.push({ label: item.description, value: item });
      });
    return array;
  };

  const getInstructionUsesArray = (): {
    label: string;
    value: { description: string; id: string };
  }[] => {
    const array: {
      label: string;
      value: { description: string; id: string };
    }[] = [];
    if (instructionUses)
      instructionUses.forEach((item) => {
        array.push({ label: item.description, value: item });
      });
    return array;
  };

  return (
    <Container
      backgroundColor="gray"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Row justifyContent="center" alignItems="center">
        <ArrowContainer>
          <BackButton onPress={(): void => navigation.goBack()} />
        </ArrowContainer>
        <Title>Minha farmácia</Title>
      </Row>
      <DataForm>
        <Row>
          <Input
            placeholder="Nome do medicamento"
            value={form.medicineName}
            onChange={(e: string): void =>
              setForm({ ...form, medicineName: e })
            }
            noBold
            error={error && form.medicineName === ""}
          />
        </Row>
        <Row>
          <Input
            placeholder="Quantidade"
            value={form.amount}
            onChange={(e: string): void => setForm({ ...form, amount: e })}
            noBold
            error={error && form.amount === ""}
          />
        </Row>
        <Row>
          <DropdownList
            selected={form.howToUse}
            setSelected={(e: {
              label: string;
              value: { description: string; id: string };
            }): void => {
              e
                ? setForm({
                    ...form,
                    howToUse: e,
                    howToUseId: e.id,
                  })
                : setForm({
                    ...form,
                  });
            }}
            items={getHowToUseArray()}
            placeholder="Forma de uso"
            noBold
            error={error && form.howToUseId === ""}
          />
        </Row>
        <Row>
          <InputArea
            placeholder="Reações adversas"
            placeholderTextColor="gray"
            value={form.adverseReactions}
            onChange={(e: string): void =>
              setForm({ ...form, adverseReactions: e })
            }
            noBold
            error={error && form.adverseReactions === ""}
          />
        </Row>
        <Row>
          <DropdownList
            selected={form.instructionUse}
            setSelected={(e: {
              label: string;
              value: { description: string; id: string };
            }): void => {
              e
                ? setForm({
                    ...form,
                    instructionUse: e,
                    instructionUseId: e.id,
                  })
                : setForm({
                    ...form,
                  });
            }}
            items={getInstructionUsesArray()}
            placeholder="Instruções de uso"
            noBold
            error={error && form.instructionUseId === ""}
          />
        </Row>
        <Row>
          <DatePicker
            label="Validade: "
            value={validity}
            onChange={(e: Date): void => setValidity(e)}
            noBold
          />
        </Row>
        <Row>
          <Button
            style={{ marginTop: 60 }}
            color="primary"
            title="Adicionar"
            size="small"
            onPress={(): Promise<void> => handleNew()}
            loading={loading}
          />
        </Row>
      </DataForm>
    </Container>
  );
};

export default NewReceipt;
