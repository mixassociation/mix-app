import { BigNumber } from "@ethersproject/bignumber";
import EventContainer from "eventcontainer";
import ConnectWalletPopup from "../component/ConnectWalletPopup";
import ExtWallet from "./ExtWallet";
import Klip from "./Klip";

class Wallet extends EventContainer {

    constructor() {
        super();
        this.checkConnected();

        ExtWallet.toss("connect", this);
        Klip.toss("connect", this);
    }

    private async checkConnected() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }

    public async loadAddress(): Promise<string | undefined> {
        if (ExtWallet.installed === true) {
            return await ExtWallet.loadAddress();
        } else {
            return Klip.address;
        }
    }

    public async loadBalance(): Promise<BigNumber | undefined> {
        if (ExtWallet.installed === true) {
            return await ExtWallet.loadBalance();
        }
    }

    public async balanceOf(address: string): Promise<BigNumber | undefined> {
        if (ExtWallet.installed === true) {
            return await ExtWallet.balanceOf(address);
        }
    }

    public async connected() {
        return await this.loadAddress() !== undefined;
    }

    public async connect() {
        if (ExtWallet.installed === true) {
            return await ExtWallet.connect();
        } else {
            return new Promise<void>((resolve) => new ConnectWalletPopup(resolve));
        }
    }

    public async addToken(
        address: string,
        symbol: string,
        decimals: number,
        image: string,
    ) {
        if (ExtWallet.installed === true) {
            ExtWallet.addToken(address, symbol, decimals, image);
        }
    }

    public async signMessage(message: string) {
        if (ExtWallet.installed === true) {
            return await ExtWallet.signMessage(message);
        } else {
            alert("현재 지갑에서는 메시지 서명이 제공되지 않습니다. 카이카스를 설치해주시기 바랍니다.");
        }
    }
}

export default new Wallet();