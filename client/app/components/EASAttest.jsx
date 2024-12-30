"use client";

import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { useState } from "react";
import {toast} from "react-hot-toast";

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";

function EASAttest() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [submitUID, setSubmitUID] = useState("");
  const [loading, setLoading] = useState(false);

  const submitAttestation = async () => {
    setSubmitUID("");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const eas = new EAS(EASContractAddress);
    eas.connect(signer);

    const schemaEncoder = new SchemaEncoder("string name, string message");
    const encodedData = schemaEncoder.encodeData([
      { name: "name", value: name, type: "string" },
      { name: "message", value: message, type: "string" },
    ]);

    const schemaUID =
      "0xb28844791177681bd44d983e8aaa017f6a378e297271a46fd20d81a5cbadc386";
    if(!address || !name || !message){
      toast.error("Enter required fields!");
      return;
    }

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: address,
        expirationTime: 0,
        revocable: true,
        data: encodedData,
      },
    });

    setLoading(true);


    const attestationId = await eas.getAttestation(schemaUID);

    console.log("attestationUID", attestationId);

    // const attestationId = await tx.wait();
    // const newAttestationUID = await tx.wait();

    setLoading(false);

    setSubmitUID(attestationId.uid);

    setName("");
    setAddress("");
    setMessage("");
    setLoading(false);
    toast.dismiss();
    setSubmitUID(attestationId.uid);
    toast.success("Attestation Done!");
    setName("");
    setAddress("");
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center">
      <input
        className="w-72 p-2 mt-12 text-black rounded-md"
        type="text"
        placeholder="Enter Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-72 p-2 mt-4 text-black rounded-md"
        type="text"
        placeholder="Enter Address..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className="w-72 p-2 mt-4 text-black rounded-md"
        type="text"
        placeholder="Enter Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={submitAttestation}
        className="w-72 p-2 mt-4 text-black rounded-md bg-slate-400"
      >
        Submit Attestation
      </button>
      {loading && <p className="mt-4">Loading...</p>}
      {submitUID && (
        <div className="mt-4">
          New Attestation Subbmited with UID: {submitUID}
        </div>
      )}
    </div>
  );
}

export default EASAttest;
