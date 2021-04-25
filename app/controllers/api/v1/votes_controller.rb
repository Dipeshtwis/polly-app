module Api
  module V1
    class VotesController < ApplicationController
      before_action :authenticate_user_using_x_auth_token, only: %i[create]
      
      def create
        @vote = Vote.new(vote_params)
        if @vote.save
          render status: :ok, json: { notice: t('vote.success_message') }
        else
          errors = @vote.errors.full_messages
          render status: :unprocessable_entity, json: { errors: errors }
        end
      end

      private

      def vote_params
        params.require(:vote).permit(:poll_id, :option_id)
          .merge(user_id: @current_user.id)
      end
    end
  end
end