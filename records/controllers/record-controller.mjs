// noinspection JSUnresolvedVariable

import { db } from '../models/record.mjs'

const { record: Record, Sequelize } = db

export function createRecord(req, res)
{
  if (!req.body.title) {
    return res.status(400).send({
      message: 'Content can not be empty'
    })
  }

  Record.create(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the record'
      })
    })
}

export function findAllRecords(req, res)
{
  const title = req.query.title
  const condition = title ? { title: { [Sequelize.Op.iLike]: `%${title}%` } } : null

  Record.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records'
      })
    })
}

export function findOneRecord(req, res)
{
  const id = req.params.id

  Record.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find record with id=${id}`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving record with id=${id}`
      })
    })
}

export function updateRecord(req, res)
{
  const id = req.params.id

  Record.update(req.body, { where: { id } })
    .then(([rows]) => {
      if (rows === 1) {
        res.send({
          message: 'Record was updated successfully'
        })
      } else {
        res.send({
          message: `Cannot update record with id=${id}`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating record with id=${id}`
      })
    })
}

export function deleteRecord(req, res)
{
  const id = req.params.id

  Record.destroy({ where: { id } })
    .then(rows => {
      if (rows === 1) {
        res.send({
          message: 'Record was deleted successfully'
        })
      } else {
        res.send({
          message: `Cannot delete record with id=${id}`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete record with id=${id}`
      })
    })
}

export function deleteAllRecords(req, res)
{
  Record.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} records were deleted successfully` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all records'
      })
    })
}
