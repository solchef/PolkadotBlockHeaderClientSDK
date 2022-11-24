import { HashFunction, MerkleProof } from "../types"

const insert = (
    leaf: Node,
    depth: number,
    arity: number,
    nodes: Node[][],
    zeroes: Node[],
    hash: HashFunction
): Node => {
    checkParameter(leaf, "leaf", "number", "string", "bigint")

    if (nodes[0].length >= arity ** depth) {
        throw new Error("The tree is full")
    }

    let node = leaf
    let index = nodes[0].length

    for (let level = 0; level < depth; level += 1) {
        const position = index % arity
        const levelStartIndex = index - position
        const levelEndIndex = levelStartIndex + arity

        const children = []
        nodes[level][index] = node

        for (let i = levelStartIndex; i < levelEndIndex; i += 1) {
            if (i < nodes[level].length) {
                children.push(nodes[level][i])
            } else {
                children.push(zeroes[level])
            }
        }

        node = hash(children)
        index = Math.floor(index / arity)
    }

    return node
}

const update = (
    index: number,
    value: Node,
    depth: number,
    arity: number,
    nodes: Node[][],
    zeroes: Node[],
    hash: HashFunction
): Node => {
    checkParameter(index, "index", "number")

    if (index < 0 || index >= nodes[0].length) {
        throw new Error("The leaf does not exist in this tree")
    }

    let node = value

    for (let level = 0; level < depth; level += 1) {
        const position = index % arity
        const levelStartIndex = index - position
        const levelEndIndex = levelStartIndex + arity

        const children = []
        nodes[level][index] = node

        for (let i = levelStartIndex; i < levelEndIndex; i += 1) {
            if (i < nodes[level].length) {
                children.push(nodes[level][i])
            } else {
                children.push(zeroes[level])
            }
        }

        node = hash(children)
        index = Math.floor(index / arity)
    }

    return node
}

const indexOf = (leaf: Node, nodes: Node[][]): number =>{
    checkParameter(leaf, "leaf", "number", "string", "bigint")

    return nodes[0].indexOf(leaf)
}


const createProof = (
    index: number,
    depth: number,
    arity: number,
    nodes: Node[][],
    zeroes: Node[],
    root: Node
): MerkleProof => {
    checkParameter(index, "index", "number")

    if (index < 0 || index >= nodes[0].length) {
        throw new Error("The leaf does not exist in this tree")
    }

    const siblings: Node[][] = []
    const pathIndices: number[] = []
    const leafIndex = index

    for (let level = 0; level < depth; level += 1) {
        const position = index % arity
        const levelStartIndex = index - position
        const levelEndIndex = levelStartIndex + arity

        pathIndices[level] = position
        siblings[level] = []

        for (let i = levelStartIndex; i < levelEndIndex; i += 1) {
            if (i !== index) {
                if (i < nodes[level].length) {
                    siblings[level].push(nodes[level][i])
                } else {
                    siblings[level].push(zeroes[level])
                }
            }
        }

        index = Math.floor(index / arity)
    }

    return { root, leaf: nodes[0][leafIndex], pathIndices, siblings }
}

const checkParameter = (value: any, name: string, ...types: string[]) => {
    if (value === undefined) {
        throw new TypeError(`Parameter '${name}' is not defined`)
    }

    if (!types.includes(typeof value)) {
        throw new TypeError(`Parameter '${name}' is none of these types: ${types.join(", ")}`)
    }
}

const  verifyProof = (proof: MerkleProof, hash: HashFunction): boolean => {
    checkParameter(proof, "proof", "object")
    checkParameter(proof.root, "proof.root", "number", "string", "bigint")
    checkParameter(proof.leaf, "proof.leaf", "number", "string", "bigint")
    checkParameter(proof.siblings, "proof.siblings", "object")
    checkParameter(proof.pathIndices, "proof.pathElements", "object")

    let node = proof.leaf

    for (let i = 0; i < proof.siblings.length; i += 1) {
        const children = proof.siblings[i].slice()

        children.splice(proof.pathIndices[i], 0, node)

        node = hash(children)
    }

    return proof.root === node
}

export {
    insert,
    indexOf,
    update,
    checkParameter,
    createProof,
    verifyProof
}