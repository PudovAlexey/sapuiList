

let testedData = [
  {name: 'Alex', year: '23', text: 'suka kod bistree'}
    ]

module.exports = {
    getAll(req, res) {
        res.status(200).json(testedData)
    }
}