const sequelize = require('../../utils/database.js');

const {Expense} = require('../../models/expense.models.js');

// to get all stored expenses of user
async function getAllExpensesOfUser(userId, order='ASC', rowsLimit) {
    try {

        if(!userId){
            throw new Error("user Id is required");
        }

        // database call to get expenses
        const expenses = await Expense.findAll({
            where : {
                userId : userId
            },
            order : [['id', order]],
            limit: rowsLimit,
        });

        return expenses;
    } catch (error) {
        throw new Error(error.message);
    }
}


// to store new expense inside database

async function createExpense(user, expenseData) {
    const t = await sequelize.transaction();

    try {
     const {amount, category , description } = expenseData;

        const expense = await user.createExpense({
            amount : amount,
            category : category,
            description : description
         },{
            transaction : t
         });

        // update total expense amount
        if(!user.totalexpenseamount){
            user.totalexpenseamount = 0;
        }
        user.totalexpenseamount = Number(user.totalexpenseamount) + Number(amount); 

        // save total expense amount
        await user.save({transaction : t});

        await t.commit();

        return expense;
    } catch (error) {
        await t.rollback();
        throw new Error(error);
    }
}


// delete user's expense with specific expenseId
async function deleteExpenseFromDatabase (user, expenseId) {
    const t = await sequelize.transaction();
    try {
        const expense = await Expense.findOne({ where: { id: expenseId } }, { transaction: t });

        if (!expense) {
            throw new Error('Expense Not Found');
        }
        
        // substract expense amount from total amount
        const newTotalExpenseAmount = (user.totalexpenseamount || 0) - Number(expense.amount);

        await Promise.all([
            user.update({ totalexpenseamount: newTotalExpenseAmount }, { transaction: t }),
            expense.destroy({ transaction: t })
        ]);

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

// get limited user's expenses with request value
async function getDataForPagination(userId, pageNumber, items_per_page){
    try {
        return await Expense.findAndCountAll({
            offset: (pageNumber-1)*items_per_page,
            limit: items_per_page,
            where : {
                userId : userId
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    getAllExpensesOfUser,
    createExpense,
    deleteExpenseFromDatabase,
    getDataForPagination
}