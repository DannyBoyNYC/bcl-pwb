export class Security {
	constructor(public ric: string, public symbol: string, public name: string, public averageDailyTradingVolume: number) { }
}

export class AmountType {
	constructor(public id: string, public name: string) { }
}

export class Query {
	private readonly _id: string;
	constructor(public security: Security, public amount: number, public amountType: AmountType) {
		this._id = `${this.security.ric}${this.amount}${this.amountType.id}`;
	}
	get id() { return this._id; }
}

export type NullQuery = Query | null;